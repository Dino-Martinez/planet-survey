import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useReducer } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { trpc } from "../../utils/trpc";
import { inputReducer } from "../../reducers/inputsReducer";

const Form: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const [state, dispatch] = useReducer(inputReducer, {
            inputs: []
        });
    const mutation = trpc.useMutation(["forms.submitForm"]);
    const {data: form, isLoading, error} = trpc.useQuery(["forms.getBySlug", slug]);
    
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if (!form || !form.id)
            return;
        
        mutation.mutate({
            formId: form.id,
            responses: state.inputs.map(input => {
                return {value: input.value, name: input.name};
            })
        });
    };

    if (!slug)
        return <h1>This form does not exist!</h1>;

    if (error)
    {
        console.error(error);
        router.push('/');
    }
    
    if (mutation.error)
    {
        console.error(error);
        router.push('/');
    }

    return (
        <>
            {form && !isLoading &&
                <form
                    key={form.id}
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center gap-2"
                >
                    <h2 className="mt-6 mb-2 text-3xl">{form.name}</h2>
                    {form.description && <h3 className="text-xl text-gray-600">{form.description}</h3>}
                    {form.inputs.map(input => {
                        return (
                            <Input 
                                key={input.id}
                                handleBlur={(id, value) => dispatch({type: 'refresh', payload: {...input, value}})}
                                id={input.id}
                                name={input.name}
                                type={input.type}
                            />
                        );
                    })}
                    <Button
                        type="submit"
                        text="Submit Response"
                    />
                </form>
            }
            {isLoading &&
                <h1>Loading...</h1>
            }
        </>
    );
};

export default Form;
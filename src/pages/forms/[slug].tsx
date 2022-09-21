import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormInputs } from "../../components/FormInputs";
import { trpc } from "../../utils/trpc";

const Form: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    type Input = {
        id: string,
        value: string
    }
    const [inputs, setInputs] = useState<Array<Input>>([]);
    const mutation = trpc.useMutation(["forms.submitForm"]);
    const {data: form, isLoading} = trpc.useQuery(["forms.getBySlug", slug]);
    
    return (
        <>
            {form && !isLoading &&
                <FormInputs
                    form={form}
                    setInputs={setInputs}
                    onSubmit={(e) => {
                        e.preventDefault();
                        mutation.mutate(inputs);
                    }}
                />
            }
            {isLoading &&
                <h1>Loading...</h1>
            }
        </>
    );
};

export default Form;
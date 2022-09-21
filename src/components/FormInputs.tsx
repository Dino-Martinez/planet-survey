import React, { Dispatch, SetStateAction } from "react";
import { inferQueryOutput } from "../utils/trpc";
import { Button } from "./Button";
import { Input } from "./Input";

type FormOutput = inferQueryOutput<'forms.getAll'>[0]
type Input = {
        id: string,
        value: string
    }
export const FormInputs: React.FC<{
    form: FormOutput,
    onSubmit: (e:React.FormEvent) => void,
    setInputs:Dispatch<SetStateAction<Input[]>>
}> = ({form, onSubmit, setInputs}) => {
    
    const refreshInputs = (id:string, value: string) => {
        console.log(id, value);
        setInputs(prev => ([
        ...prev.filter(input => input.id !== id),
        {
            id,
            value
        }
        ]));
    };

    return (
        <>
            <form
                key={form.id}
                onSubmit={onSubmit}
                className="flex flex-col justify-center gap-2"
            >
                <h2 className="mt-6 mb-2 text-3xl">{form.name}</h2>
                {form.description && <h3 className="text-xl text-gray-600">{form.description}</h3>}
                {form.inputs.map(input => {
                return (
                    <Input 
                        key={input.id}
                        handleBlur={refreshInputs}
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
        </>
    );
};
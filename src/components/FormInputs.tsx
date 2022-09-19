import React, { Dispatch, SetStateAction } from "react";
import { inferQueryOutput } from "../utils/trpc";
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
            >
                <h2 className="mt-6 mb-2 text-3xl">{form.name}</h2>
                {form.description && <h3 className="text-xl text-gray-600">{form.description}</h3>}
                {form.inputs.map(input => {
                return (
                    <Input 
                        key={input.id}
                        refresh={refreshInputs}
                        id={input.id}
                        name={input.name}
                        defaultType={input.type}
                    />
                );
              })}
                <button
                    className="mt-4 px-4 py-2 border rounded-md border-slate-100 hover:bg-sky-900"
                    type="submit"
                >Submit Response
                </button>
            </form>
        </>
    );
};
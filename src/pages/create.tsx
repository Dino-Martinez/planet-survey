import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useReducer, useState } from "react";
import {useAutoAnimate} from '@formkit/auto-animate/react';
import Link from "next/link";
import { Button } from "../components/Button";
import { RemoveableInput } from "../components/RemovableInput";
import { nanoid } from "nanoid";
import { inputReducer } from "../reducers/inputsReducer";
import { InputType } from "../types/inputs";

const createInput = () => {
    return  (
        {
            id: nanoid(8),
            name: '',
            type: 'text',
            value: ''
        });
};

const Create: NextPage = () => {
    const [parent] = useAutoAnimate<HTMLFormElement>();
    const [name, setName] = useState('');
    const [state, dispatch] = useReducer(inputReducer, {
            inputs: []
        });
    const mutation = trpc.useMutation(["forms.createForm"]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({name, inputs: state.inputs});
    };

    return(
        <>
            <div className="flex flex-col items-center justify-center w-full gap-6">
                <h1 className="text-5xl">Create a Form</h1>
                
                {!mutation.isLoading && mutation.data ?
                    (
                        <>
                            <h2 className="text-3xl">Your form has been created!</h2>
                            
                            <p>It can be accessed at 
                                <Link href={`/forms/${mutation.data.slug}`}>
                                    <a className="text-2xl text-blue-400 hover:text-blue-600"> this location.</a>
                                </Link>
                            </p>
                        </>
                    ):(
                        <form
                            onSubmit={handleSubmit}
                            ref={parent}
                            className="flex flex-col items-center justify-center gap-2 "
                        >
                            <div className="flex w-full">
                                <label>Name your form:</label>

                                <input
                                    className="ml-4 bg-transparent border rounded-md border-slate-100"
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            {state.inputs.map((input: InputType) => 
                                (
                                    <RemoveableInput
                                        key={input.id}
                                        refresh={(value: string, type: string) => dispatch({type:"refresh", payload:{...input, name: value, type: type}})}
                                        id={input.id}
                                        remove={() => dispatch({type:"remove", payload:input})}
                                    />
                                )
                            )}
                            <div className="flex justify-center w-full gap-3">
                                <Button
                                    type="button"
                                    text="Add an Input"
                                    handleClick={() => dispatch({type:"add", payload: createInput()})}
                                />

                                <Button
                                    type="submit"
                                    text="Create form"
                                />
                            </div>
                        </form>
                    )
                }
            </div>
        </>
    );
};

export default Create;
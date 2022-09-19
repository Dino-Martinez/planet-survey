import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import { Input } from "../components/Input";
import {useAutoAnimate} from '@formkit/auto-animate/react';
import Link from "next/link";

type Input = {
  id: string,
  name: string,
  type: string
}

const Create: NextPage = () => {
    const [name, setName] = useState('');
    const [inputs, setInputs] = useState<Array<Input>>([]);
    const form = {name, inputs};
    const [lastId, setLastId] = useState(0);
    const [parent] = useAutoAnimate<HTMLFormElement>();
    const mutation = trpc.useMutation(["forms.createForm"]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    const addInput = () => {
        setInputs(prev=>([
        ...prev,
        {
            id: '' + lastId,
            name: '',
            type: 'text'
        }
        ]));
        setLastId(lastId + 1);
    };

    const refreshInput = (id:string, name:string, type:string) => {
        setInputs(prev => ([
        ...prev.filter(input => input.id !== id),
        {
            id,
            name,
            type
        }
        ]).sort((a,b) => +a.id - +b.id));
    };

    const removeInput = (id:string) => {
        setInputs(prev => ([
        ...prev.filter(input => input.id !== id)
        ]));
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
                            {inputs.map(input => 
                                (
                                    <Input
                                        key={input.id}
                                        refresh={refreshInput}
                                        id={input.id}
                                        remove={removeInput}
                                    />
                                )
                            )}
                            <div className="flex justify-center w-full gap-3">
                                <button
                                    type="button"
                                    onClick={addInput}
                                    className="px-4 py-2 border rounded-md border-slate-100 hover:bg-sky-900"
                                >
                                    Add an Input
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border rounded-md border-slate-100 hover:bg-sky-900"
                                >
                                    Create form
                                </button>
                            </div>
                        </form>
                    )
                }
            </div>
        </>
    );
};

export default Create;
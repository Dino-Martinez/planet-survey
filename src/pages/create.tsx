import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import { Input } from "../components/Input";
import {useAutoAnimate} from '@formkit/auto-animate/react';
import Link from "next/link";

type Input = {
  id: number,
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
            id: lastId,
            name: '',
            type: 'text'
        }
        ]));
        setLastId(lastId + 1);
    };

    const refreshInput = (id:number, name:string, type:string) => {
        setInputs(prev => ([
        ...prev.filter(input => input.id !== id),
        {
            id, name, type
        }
        ]).sort((a,b) => a.id - b.id));
    };

    const removeInput = (id:number) => {
        setInputs(prev => ([
        ...prev.filter(input => input.id !== id)
        ]));
    };

    return(
        <>
        <div className="w-full flex flex-col gap-6 justify-center items-center">
        <h1 className="text-5xl">Forms</h1>
        {!mutation.isLoading && mutation.data ?
            (
                <>
                    <h2>Your form has been created!</h2>
                    <p>It can be accessed at <Link href={`/forms/${mutation.data.slug}`}><a>this location.</a></Link></p>
                </>
            ):(
                <form onSubmit={handleSubmit} ref={parent} className="flex flex-col gap-2 justify-center items-center">
                    <div className="flex justify-between w-full">
                    <label>Name your form:</label>
                    <input className="border border-gray-500 rounded ml-2"  type="text" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    {inputs.map(input => <Input key={input.id} refresh={refreshInput} id={input.id} remove={removeInput}/>)}
                    <div className="flex justify-center gap-3 w-full">
                    <button type="button" onClick={addInput} className="border border-gray-500 rounded py-1 px-3 hover:bg-slate-300">Add an Input</button>
                    <button type="submit" className="border border-gray-500 rounded py-1 px-3 hover:bg-slate-300">Create form</button>
                    </div>
                </form>
            )
        }
        </div>
        </>
    );
};

export default Create;
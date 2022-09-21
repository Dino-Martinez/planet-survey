import { useState } from "react";
import { Input } from "./Input";

export  const RemoveableInput: React.FC<{
    refresh: (id:string, name:string, type:string) => void,
    remove: (id:string) => void,
    name?: string,
    defaultType?:string,
    id: string
}> = ({refresh, remove, id, name, defaultType="text"}) => {
    const [type, setType] = useState('text');
    const [value, setValue] = useState('');

    return (
        <div
            onBlur={() => refresh(id, value, type)}
        >
            <Input
                name={name}
                type={defaultType}
                handleChange={setValue}
            />
            <div className="flex items-center justify-between">
                <select
                    onChange={e => setType(e.target.value)}
                    value={type}
                    className="border rounded-md bg-slate-900 border-slate-100"
                >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="password">Password</option>
                </select>
                <button
                    type="button"
                    onClick={() => remove(id)}
                    className="px-4 py-0 my-2 ml-auto border rounded-md border-slate-100 hover:bg-sky-900 hover:text-red-500"
                >Remove
                </button>
            </div>
        </div>
    );
};
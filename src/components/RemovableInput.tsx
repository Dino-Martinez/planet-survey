import { useState } from "react";
import { Input } from "./Input";

export  const RemoveableInput: React.FC<{
    refresh: (value: string) => void,
    remove: () => void,
    name?: string,
    defaultType?:string,
    id: string
}> = ({refresh, remove, name, defaultType="text"}) => {
    const [type, setType] = useState('text');
    const [value, setValue] = useState('');

    return (
        <div
            onBlur={() => refresh(value)}
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
                    onClick={() => remove()}
                    className="px-4 py-0 my-2 ml-auto border rounded-md border-slate-100 hover:bg-sky-900 hover:text-red-500"
                >Remove
                </button>
            </div>
        </div>
    );
};
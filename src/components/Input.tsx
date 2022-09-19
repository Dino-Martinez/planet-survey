import { useState } from "react";

export  const Input: React.FC<{
    refresh: (id:string, name:string, type:string) => void,
    remove?: ((id:string) => void) | undefined,
    name?: string,
    defaultType?:string,
    id: string
}> = ({refresh, remove, id, name, defaultType}) => {
    const [type, setType] = useState('text');
    const [value, setValue] = useState('');
    return (
        <>
            <div
                onBlur={() => refresh(id, value, type)}
                className="flex items-end justify-between w-full"
            >
                <div>
                    <label className="block mb-auto">{name ?? "Name"}</label>
                    <input
                        className="bg-transparent border rounded-md border-slate-100" 
                        type={defaultType ?? "text"}
                        value={value} 
                        onChange={e => setValue(e.target.value)}
                    />
                </div>
                {remove !== undefined &&
                    <div>
                        <button
                            type="button"
                            onClick={() => remove(id)}
                            className="block w-full px-4 py-0 my-2 ml-auto border rounded-md border-slate-100 hover:bg-sky-900 hover:text-red-500"
                        >X
                        </button>
                        <select
                            onChange={e => setType(e.target.value)}
                            value={type}
                            className="border rounded-md bg-slate-900 border-slate-100"
                        >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="password">Password</option>
                        </select>
                    </div>
                }
            </div>
        </>
    );
};
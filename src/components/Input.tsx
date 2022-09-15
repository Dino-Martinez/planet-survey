import { useState } from "react";

export  const Input: React.FC<{
    refresh: (id:number, name:string, type:string) => void,
    remove: (id:number) => void,
    id: number
}> = ({refresh, remove, id}) => {
    const [type, setType] = useState('text');
    const [name, setName] = useState('');
    return (
        <>
            <div
                onBlur={() => refresh(id, name, type)}
                className="flex items-end justify-between w-full"
            >
                <div>
                    <label className="block mb-auto">Name</label>
                    <input
                        className="bg-transparent border rounded-md border-slate-100" 
                        type='text'  
                        value={name} 
                        onChange={e => setName(e.target.value)}
                    />
                </div>
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
            </div>
        </>
    );
};
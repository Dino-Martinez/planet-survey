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
    <div onBlur={() => refresh(id, name, type)}>
        <label>Name</label>
        <input className="border border-gray-500 rounded" 
            type='text'  
            value={name} 
            onChange={e => setName(e.target.value)} 
        />
        <select onChange={e => setType(e.target.value)} value={type}>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="password">Password</option>
        </select>
        <button type="button" onClick={() => remove(id)} >X</button>
    </div>
    </>
    );
};
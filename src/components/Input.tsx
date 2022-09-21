import React, { SetStateAction, useState } from "react";

export  const Input: React.FC<{
    id?: string,
    name?: string,
    type?:string,
    handleChange?: (React.Dispatch<SetStateAction<string>>),
    handleBlur?: (id: string, value: string) => void
}> = ({name="Name", type="text", handleChange, handleBlur, id=''}) => {
    const [value, setValue] = useState('');

    
    return (
        <>
            <label className="block mb-auto">{name}</label>
            <input
                className="bg-transparent border rounded-md border-slate-100" 
                type={type}
                value={value} 
                onBlur={handleBlur ? () => handleBlur(id, value) : undefined}
                onChange={e => {
                    setValue(e.target.value);
                    if (handleChange)
                        handleChange(e.target.value);
                }}
            />
        </>
    );
};
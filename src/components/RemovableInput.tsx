import { useState } from "react";
import { Input } from "./Input";
import clsx from "clsx";
import { Listbox  } from '@headlessui/react';
import {button} from "../styles/tw-components";

const options = [
    'text',
    'number',
    'date',
    'password',
    'email'
];

export  const RemoveableInput: React.FC<{
    refresh: (value: string, type: string) => void,
    remove: () => void,
    name?: string,
    defaultType?:string,
    id: string
}> = ({refresh, remove, name, defaultType="text"}) => {
    const [type, setType] = useState('text');
    const [value, setValue] = useState('');

    return (
        <div
            onBlur={() => refresh(value, type)}
        >
            <Input
                name={name}
                type={defaultType}
                handleChange={setValue}
            />
            <div className="flex items-center justify-between gap-6">
                <div className="flex flex-col w-full relative">
                    <Listbox 
                        value={type}
                        onChange={setType}
                    >
                        <Listbox.Button className={clsx(button)}>{type} v</Listbox.Button>
                        <Listbox.Options className="absolute top-full my-2 bg-slate-800">
                            {options.map(opt => {
                                return (
                                    <Listbox.Option
                                        key={opt}
                                        value={opt}
                                    >
                                        <p className="hover:bg-slate-700 hover:text-white hover:cursor-pointer select-none px-4 py-1">
                                            {opt}
                                        </p>
                                    </Listbox.Option>
                                );
                            })}
                        </Listbox.Options>
                    </Listbox >
                </div>

                <button
                    type="button"
                    onClick={() => remove()}
                    className={clsx(button, "py-0 my-2 ml-auto hover:text-red-500")}
                >Remove
                </button>
            </div>
        </div>
    );
};
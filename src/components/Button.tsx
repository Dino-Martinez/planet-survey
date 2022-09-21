import React from "react";

export const Button: React.FC<{
    text: string,
    type?: "button" | "submit" | "reset",
    handleClick?: (e:React.MouseEvent<HTMLElement>) => void
}> = ({text, type="button", handleClick}) => {
    return (
        <button
            type={type}
            onClick={handleClick}
            className="px-4 py-2 border rounded-md border-slate-100 hover:bg-sky-900"
        >
            {text}
        </button>
    );
};
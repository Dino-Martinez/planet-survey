import React from "react";
import {button} from "../styles/tw-components";
export const Button: React.FC<{
    text: string,
    type?: "button" | "submit" | "reset",
    handleClick?: (e:React.MouseEvent<HTMLElement>) => void
}> = ({text, type="button", handleClick}) => {
    return (
        <button
            type={type}
            onClick={handleClick}
            className={button}
        >
            {text}
        </button>
    );
};
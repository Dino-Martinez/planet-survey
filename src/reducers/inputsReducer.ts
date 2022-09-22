import { InputState, InputAction, InputType } from "../types/inputs";
export const inputReducer = (prev: InputState, action: InputAction) : InputState => {
    switch (action.type) {
        case "add":
            return {
                inputs: [...prev.inputs, action.payload]
                     };
        case "refresh":
            const {id, name, type} = action.payload;
            return {
                inputs: [...prev.inputs.filter((input: InputType) => input.id !== id),
                            {
                                id,
                                name,
                                type
                            }
                        ].sort((a,b) => +a.id - +b.id)
                    };
        case "remove":
            return {
                inputs: [ ...prev.inputs.filter((input: InputType) => input.id !== action.payload.id)]
            };
        default:
            return prev;
    }
};
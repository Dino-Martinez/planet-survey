import { InputState, InputAction, InputType } from "../types/inputs";
export const inputReducer = (prev: InputState, action: InputAction) : InputState => {
    switch (action.type) {
        case "add":
            return {
                inputs: [...prev.inputs, action.payload]
                     };
        case "refresh":
            const {id, name, type, value} = action.payload;
            // To preserve sort order, must update value in place
            const index = prev.inputs.findIndex(input => input.id === id);
            return {
                inputs: [
                    ...prev.inputs.slice(0, index),
                    {id, name, type, value},
                    ...prev.inputs.slice(index + 1)
                ]
            };
        case "remove":
            return {
                inputs: [ ...prev.inputs.filter((input: InputType) => input.id !== action.payload.id)]
            };
        default:
            return prev;
    }
};
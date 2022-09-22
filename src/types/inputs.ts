export type InputType = {
id: string,
name: string,
type: string,
value: string
}

export type InputState = {
    inputs: InputType[]
}

export type InputAction = {
    type:string,
    payload: InputType
}


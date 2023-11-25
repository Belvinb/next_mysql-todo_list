import { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
    containerStyles? : string,
    handleClick? : MouseEventHandler<HTMLButtonElement>,
    isDisabled ? : boolean,
    children : ReactNode

}

export interface InputProps {
    type : string,
    name : string,
    containerStyles ? : string,
    placeholder ? : string,
    required ? : boolean,
    value ? : string,
    setData ? :(value:any) => void,
    checked ?: boolean,
    min? :any

}

export interface BodyProps {
    item_name : string,
    date : string
}
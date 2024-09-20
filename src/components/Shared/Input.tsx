//Import React
import React, { ChangeEvent } from 'react'

//Definição do tipo
interface InputProps {
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string
}

const Input: React.FC<InputProps> = ({type, value, onChange, placeholder}) => {

    return <input type={type} value={value} onChange={onChange} placeholder={placeholder} />;
}

//Exportar tipo
export default Input;
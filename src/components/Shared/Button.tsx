//Importação
import React from 'react'


//Declaração de tipo
interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> =({label, onClick, type='button'}) => {
    return <button type={type} onClick={onClick}>{label}</button>
}

//exportação do tipo
export default Button;
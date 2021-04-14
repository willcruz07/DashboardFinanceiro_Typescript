import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';


/* Criando uma infterface que recebe todos os elementos de input HTML */
type IInputProps = InputHTMLAttributes<HTMLInputElement>

/* O parametro ...rest pega todas as propriedades herdads do input */
const Input: React.FC<IInputProps> = ({ ...rest }) => (
    <Container { ...rest }/>          
);

export default Input;
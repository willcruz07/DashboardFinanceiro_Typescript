import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';


/* Criando uma infterface que recebe todos os elementos de button podendo receber children HTML */
type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

/* O parametro ...rest pega todas as propriedades herdads do Button */
const Button: React.FC<IButtonProps> = ({ children, ...rest }) => (
    <Container { ...rest }>
        {children}
    </Container>    
);

export default Button;
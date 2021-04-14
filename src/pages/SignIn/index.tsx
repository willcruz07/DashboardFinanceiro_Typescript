import React, { useState } from 'react';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { useAuth } from '../../hooks/auth';

import {
    Container,
    Logo,
    Form,
    FormTitle
} from './styles';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { signIn } = useAuth();

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira"/>
                <h3>Minha Carteira</h3>
            </Logo>

            <Form onSubmit={() => signIn(email, password)}>
                <FormTitle>Entrar</FormTitle>

                <Input  
                    placeholder="e-mail"
                    type="email"
                    required   
                    onChange={(e) => setEmail(e.target.value)}                 
                />
                <Input
                    placeholder="senha"
                    type="password"
                    required                    
                    onChange={(e) => setPassword(e.target.value)}                 
                />

                <Button type="submit">Acessar</Button>
            </Form>
        </Container>        
    );
}

export default SignIn;
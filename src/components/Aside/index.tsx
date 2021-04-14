import React, { useState, useCallback } from 'react';

import logoimg from '../../assets/logo.svg';
import Toggle from '../Toggle';

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdClose,
    MdMenu,
    MdExitToApp
} from 'react-icons/md';

import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';


import { 
    Container,
    Header,    
    LogoImg,
    MenuContainer,
    MenuItemLink,
    Title,
    ToggleMenu,
    ThemeToggleFooter,
    MenuItemButton
} from './styles' 

const Aside: React.FC = () => {
    const { signOut } = useAuth();
    const { toggleTheme, theme } = useTheme();

    const [toggleMenuIsOpned, setToggleMenuIsOpned] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);
   

    const handleToggleMenu = useCallback(() => {
        setToggleMenuIsOpned(!toggleMenuIsOpned);
    }, [toggleMenuIsOpned]);

    const handleChangeTheme = useCallback(() => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }, [darkTheme, toggleTheme]);

    return (
        <Container menuIsOpen={toggleMenuIsOpned}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    {toggleMenuIsOpned ? <MdClose/> : <MdMenu/>}
                </ToggleMenu>

                <LogoImg src={logoimg} alt="Logo Minha Carteira"/>
                <Title> Minha Carteira </Title>
            </Header>

            <MenuContainer>

                <MenuItemLink href="/">
                    <MdDashboard/>  
                    Dashboard                
                </MenuItemLink>

                <MenuItemLink href="/list/entrada"> 
                    <MdArrowUpward/>
                    Entradas                
                </MenuItemLink>

                <MenuItemLink href="/list/saida"> 
                    <MdArrowDownward/>
                    Saidas
                </MenuItemLink>

                <MenuItemButton onClick={signOut}> 
                    <MdExitToApp/>
                    Sair
                </MenuItemButton>

            </MenuContainer>

            <ThemeToggleFooter menuIsOpen={toggleMenuIsOpned}>
                <Toggle
                    labelLeft="Light"                
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                /> 
            </ThemeToggleFooter>
        </Container>
    );
}

export default Aside;
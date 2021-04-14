import React, { useMemo, useState, useCallback} from 'react';

import { useTheme } from '../../hooks/theme';

import emojis from '../../utils/emojis';
import Toggle from '../Toggle';

import { 
    Container, 
    Profile,
    Username,
    Welcome
} from './styles';

const MainHeader: React.FC = () => {

    const { toggleTheme, theme } = useTheme();

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const emoji = useMemo(() => {
        const index = Math.floor(Math.random() * emojis.length)
        return emojis[index];
    }, []);

    const handleChangeTheme = useCallback(() => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }, [darkTheme, toggleTheme]);

    return (
        <Container>
            <Toggle
                labelLeft="Light"                
                labelRight="Dark"
                checked={darkTheme}
                onChange={handleChangeTheme}
            />           
            <Profile>
                <Welcome> Olá, {emoji} </Welcome>
                <Username> Wellen </Username>
            </Profile>            
        </Container>        
    );
}

export default MainHeader;
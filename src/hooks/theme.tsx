import React, { createContext, useState, useContext} from 'react';

import dark from '../styles/Themes/dark';
import light from '../styles/Themes/light';

/*
    * IThemeContext - Interface criada para o Context onde possui uma função troca e o tema informado
 */
interface IThemeContext {
    toggleTheme(): void;
    theme: ITheme;
}

/*
    * ITheme - Interface criada para deficinar as informações do thema
 */

interface ITheme {
    title: string;
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;

        white: string;
        black: string;
        gray: string;

        success: string;
        info: string;
        warning: string;
    }
}


/*
    * Criação do Context
*/
const ThemeDashboardContext = createContext<IThemeContext>({} as IThemeContext);

/*
    * Criação do provider
*/
const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<ITheme>(() => {
        const themeSaved = localStorage.getItem('@minha-carteira:theme');
        if(themeSaved) {
            return JSON.parse(themeSaved)
        } else {
            return dark
        }
    });

    const toggleTheme = () => {
        if(theme.title === 'dark'){
            setTheme(light)
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(light))
        } else {
            setTheme(dark)
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(dark))
        }
    };

    return (
        <ThemeDashboardContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </ThemeDashboardContext.Provider>
    )
};

/*
    * Criando o useTheme para poder exportar
*/
function useTheme(): IThemeContext {
    const context = useContext(ThemeDashboardContext);

    return context;
}

export { ThemeProvider, useTheme };


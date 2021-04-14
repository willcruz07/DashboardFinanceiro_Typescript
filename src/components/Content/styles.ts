import styled from 'styled-components';

export const Container = styled.div`
    grid-area: CT; 

    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primary};  

    padding: 25px;

    /* 
    
    Colocando apenas as informações do content para receber scroll
    adicionando 100vh que seria o valor total da view height - 70px que seria a altura do header
    feito isso adiciona overflow-y: scrooll para oque não couber, receber scroll    

    */
    height: calc(100vh - 70px);
    overflow-y: scroll;

    /*
        estilizando scroll bar
    */

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.secondary};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.tertiary};
    }

`;


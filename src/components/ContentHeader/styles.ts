import styled from 'styled-components';

interface ITtitleContainerProps {
    lineColor: string;
}

export const Container = styled.div `
    width: 100%;
    display: flex;
    justify-content: space-between;

    margin-bottom: 25px;
`;

export const TitleContainer = styled.div<ITtitleContainerProps> `
    >h1{
        color: ${props => props.theme.colors.white};

        &::after{
            content: '';
            display: block;
            width: 55px;
            border-bottom: 10px solid ${props => props.lineColor};
        }
    }

    @media(max-width: 420px) {
        > h1 {
            font-size: 22px;            
        }
        &::after {
            content: '';
            display: block;
            width: 55px;
            border-bottom: 5px solid ${props => props.theme.colors.lineColor};
        }
    }
`;

export const Controllers = styled.div `
    display: flex;    
`;
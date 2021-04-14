import styled, { keyframes } from 'styled-components';

interface ITagProps {
    color: string;
}

const animate = keyframes `
    0% {
        transform: translateX(-100px);
    }
    50% {
        opacity: .3;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.li `
    background-color: ${props => props.theme.colors.tertiary};
    list-style: none;
    border-radius: 5px;
    margin: 10px 0;
    padding: 12px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    position: relative;

    transition: all .3s;

    animation: ${animate} .5s ease-in;

    &:hover {
        opacity: .7;
        transform: translateX(10px);   
    }

    >div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;       
        padding-left: 10px;
    }

    > div span {
        font-weight: 500;
        font-size: 18px
    }
`;

export const Tag = styled.div<ITagProps> `
    width: 10px;
    height: 70%;
    background-color: ${props => props.color};
    position: absolute;
    left: 0;
`;
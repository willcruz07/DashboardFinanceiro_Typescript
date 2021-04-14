import React from 'react';
import CountUp from 'react-countup';

import dollarImg from '../../assets/dollar.svg';
import arrowDownImg from '../../assets/arrow-down.svg';
import arrowUpImg from '../../assets/arrow-up.svg';

import { Container } from './styles';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerLabel: string;
    icon: 'dollar' | 'arrowUp' | 'arrowDown' ;
    color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerLabel,
    icon,
    color
}) => {

    const iconSelected = () => {
       switch (icon) {
           case 'dollar':
               return dollarImg;
           case 'arrowDown':
               return arrowDownImg
           case 'arrowUp':
               return arrowUpImg                    
           default:
               return undefined;
       } 
    }

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <strong>R$ </strong>
                <CountUp
                    end= {amount}                    
                    separator="."
                    decimal=","
                    decimals={2}
                />
            </h1>
            <small>{footerLabel}</small>
            <img src={iconSelected()} alt={title}/>
        </Container>
    );
};

export default WalletBox;
import React from 'react';

import { Container } from './styles';

import MainHeader from '../MainHeader'
import Content from '../Content';
import Aside from '../Aside';


const Layout: React.FC = ({children}) => {
    return (
        <Container>
            <MainHeader/>
            <Aside/>
            <Content>
                {children}
            </Content>
        </Container>
    );
}

export default Layout;
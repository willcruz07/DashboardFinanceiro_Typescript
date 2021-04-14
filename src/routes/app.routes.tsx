import React from 'react';

import {
    Switch, 
    Route
} from 'react-router-dom';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';

/*
    O Switch é responsável por direicionar as rotas do sistema, ao passar o paramentro :type, 
    informo sobre o paremetro de exibição para a mesma a tela, se a tela vai exibir as entradas ou saidas. 
*/
const AppRoutes: React.FC = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Dashboard}></Route>
                <Route path='/list/:type' exact component={List}></Route>
            </Switch>    
        </Layout>    
    )
};

export default AppRoutes;
import styled from 'styled-components';

/*

* AS = ASIDE
* MH = MainHeader
* CT = Container

*/

export const Container = styled.div`
    display: grid;
    grid-template-columns: 250px auto;
    grid-template-rows: 70px auto;

    min-width: 320px;

    grid-template-areas:
    'AS MH'
    'AS CT';

    height: 100vh;

/* 
    Ajustando a visualização com mediaquery para dispositvos com 600px deixando visivel
    apenas o main header e content
 */
    @media(max-width: 600px){
        grid-template-columns: 100%;
        grid-template-rows: 70px auto;

        grid-template-areas: 
        'MH'
        'CT';
    }

`;


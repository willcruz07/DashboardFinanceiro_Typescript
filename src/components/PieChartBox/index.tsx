import React from 'react';

import {PieChart, ResponsiveContainer, Cell, Pie} from 'recharts';

import { 
    Container,
    SideLeft,
    SideRight,
    LegendContainer,
    Legend
} from './styles';

interface IPieChartProps {
    data: {
        name: string;
        value: number;
        percent: number;
        color: string;
    }[];
};

/* Ao criar o componente sem a {} do final e returno, 
    informa que é um componente stetless sem estado, não recebe manipulação, 
    ficando assim mais performatico */
const PieChartBox: React.FC<IPieChartProps> = ({data}) => (
        <Container>
            <SideLeft>
                <h2>Relação</h2>
                <LegendContainer>
                    {
                        data.map(indicator => (
                            <Legend key={indicator.name} color={indicator.color}>
                                <div>{indicator.percent}%</div>
                                <span>{indicator.name}</span>
                            </Legend>                   
                        ))                        
                    }
                </LegendContainer>
            </SideLeft>
            <SideRight> 
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={data} dataKey="percent">
                            {
                                data.map((indicator)=>(
                                    <Cell key={indicator.name} fill={indicator.color}/>
                                ))
                            }
                        </Pie>                        
                    </PieChart>                                        
                </ResponsiveContainer>                                      
            </SideRight>
        </Container>
);

export default PieChartBox;
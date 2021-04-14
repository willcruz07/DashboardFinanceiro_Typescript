import React, {useMemo, useState, useCallback} from 'react';


import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistorytBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import listOfMonths from '../../utils/months';


import happySVG from '../../assets/happy.svg';
import sadSVG from '../../assets/sad.svg';
import grinning from '../../assets/grinning.svg';
import thinking from '../../assets/thinking.svg';


import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';

import { 
    Container,
    Content
} from './styles';

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());    


    const year = useMemo(() => {
        let uniqueYears: number[] = [];
        
        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            console.log(item.description);
            console.log(year);
            

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        });
    }, []);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {           
            return {
                value: index + 1,
                label: month
            }          
        });
    }, []);


    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1);

            if(month === monthSelected && year === yearSelected){
                try {
                    total += Number(item.amount);                    
                } catch {
                    throw new Error('Invalid amount! Amount must be number.');
                }               
            }         
        });

        return total;        
    }, [monthSelected, yearSelected]);


    const totalGains = useMemo(() => {
        let total = 0;
        
        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1);

            if(month === monthSelected && year === yearSelected){
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount!');                    
                }
            }            
        });
        return total;
    }, [monthSelected, yearSelected]);

    const totalBalance = useMemo(() => {
        return (totalGains - totalExpenses);
    }, [totalGains, totalExpenses]);


    const messageCard = useMemo(() => {                  
        if (totalBalance === 0 && totalGains === 0 && totalExpenses === 0){
            return {
                title: "Op's!",
                description: "Neste mês não há registros de entradas ou saídas",
                footerText: "Parece que você não tem nem um registro no mês e ano selecionado.",
                icon:thinking
            } 
        } else if(totalBalance === 0 && (totalGains !== 0 || totalExpenses !== 0))  {
            return {
                title: "Ufaa!",
                description: "Neste mês você gastou exatamente oque ganhou",
                footerText: "Tenha cuidado, tente economizar.",
                icon:grinning
            } 
        } else if(totalBalance < 0){
            return {
                title: "Que triste!",
                description: "Neste mês você gastou mais do que deveria.",
                footerText: "Verifique seus gastos e tente economizar no próximo mês.",
                icon:sadSVG
            } 
        } else {
            return {
                title: "Muito bem!",
                description: "Sua carteira está positiva!",
                footerText: "Continue assim. Considere investir seu saldo",
                icon:happySVG
            }
        }

    }, [totalBalance, totalGains, totalExpenses]);

    const relationExpensesandGains = useMemo(() => {       

        const total = (totalGains + totalExpenses);        

        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));
      
        const data = [            
            {
                name: 'Entradas',
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: '#F7931B'
            },
            {
                name: 'Saídas',
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
                color: '#E44C4E'
            }
        ];

        return data;

    }, [totalGains, totalExpenses]);

    const historyData = useMemo(() => {
        return listOfMonths.map((_, month) => {

            let amountEntry = 0;
            gains.forEach(gain =>{
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if((gainMonth === month) && (gainYear === yearSelected)){
                    try {
                        amountEntry += Number(gain.amount);                        
                    } catch {
                        throw new Error('amountEntry invalid!');
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expenses =>{
                const date = new Date(expenses.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if((expenseMonth === month) && (expenseYear === yearSelected)){
                    try {
                        amountOutput += Number(expenses.amount);                        
                    } catch {
                        throw new Error('amountOutput invalid!');
                    }
                }
            });

            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0,3),
                amountEntry,
                amountOutput
            }
/* Realizando o filter para exibir no grafico apenas os meses que possuem valor */            
        }).filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear);
        });
    }, [yearSelected]);

    const relationExpensesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter((expenses) => {
            const date = new Date(expenses.date);
            const year = date.getFullYear();
            const month = date.getMonth();

            return month === monthSelected && year === yearSelected;
        }).forEach((expenses) => {
            if(expenses.frequency === 'recorrente'){
                return amountRecurrent += Number(expenses.amount);
            }

            if(expenses.frequency === 'eventual'){
                return amountEventual += Number(expenses.amount);
            }
        });

        const total = amountRecurrent + amountEventual;        

        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrente',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ]

    },[monthSelected, yearSelected]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter((gains) => {
            const date = new Date(gains.date);
            const year = date.getFullYear();
            const month = date.getMonth();

            return month === monthSelected && year === yearSelected;
        }).forEach((gains) => {
            if(gains.frequency === 'recorrente'){
                return amountRecurrent += Number(gains.amount);
            }

            if(gains.frequency === 'eventual'){
                return amountEventual += Number(gains.amount);
            }
        });

        const total = amountRecurrent + amountEventual;        

        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrente',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ]
    },[monthSelected, yearSelected]);    

    const handleMonthSelected = useCallback((month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('invalid month value');
        }
    }, []);

    const handleYearSelected = useCallback((year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('invalid year value');
        }
    }, []);

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
            <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={year} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>            

            <Content>
                <WalletBox 
                    title="Saldo"
                    color="#4E41F0"
                    amount={totalBalance}
                    footerLabel="Atualizado com base nas entradas"
                    icon="dollar"                
                />   

                <WalletBox 
                    title="Entradas"
                    color="#F7931B"
                    amount={totalGains}
                    footerLabel="Atualizado com base nas entradas"
                    icon="arrowUp"                
                />   

                <WalletBox 
                    title="Saídas"
                    color="#E44C4E"
                    amount={totalExpenses}
                    footerLabel="Atualizado com base nas entradas"
                    icon="arrowDown"                
                />       

                <MessageBox
                    title={messageCard.title}
                    description={messageCard.description}
                    footerText={messageCard.footerText}
                    icon={messageCard.icon}
                />    
                <PieChartBox data={relationExpensesandGains}/>                                     
                <HistorytBox 
                    data={historyData}                    
                    lineColorAmountEntry="#F7931B"
                    lineColorAmountOutput="#E44C4E"/>
                <BarChartBox
                    title="Saídas"
                    data={relationExpensesRecurrentVersusEventual}                
                />
                <BarChartBox
                    title="Entradas"
                    data={relationGainsRecurrentVersusEventual}                
                />
            </Content>
        </Container>        
    );
}

export default Dashboard;

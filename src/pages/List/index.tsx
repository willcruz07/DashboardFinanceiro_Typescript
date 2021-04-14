import React, {useMemo, useState, useEffect} from 'react';


import {uuid} from 'uuidv4';


import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';


import gains from '../../repositories/gains';
import expens from '../../repositories/expenses';
import formattedCurrency from '../../utils/formatCurrency';
import formattedDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';


import { 
    Container, 
    Content, 
    Filters 
} from './styles';


interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
};


/* Interface para o parametro match
    Criando um interface IRouteParams para pegar o parametro do match, que é disponibilizado pelo 
    react-router-dom   
    utilizamos o parametro "type"   dentro IRouteParams pois o mesmo foi definido com este no dentro
    do rota em List/:type
*/

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}


const List: React.FC<IRouteParams> = ({match}) => {
/* useState
    useState armazena estado da aplicação e gera efeito na aplicação para atualizar a pagina, componentes
    etc. 

    o useState é um array que na primeira posição guarda o valor do estado e na segunda tem uma
    função que atualiza, onde é possível criar um valor inicial. Criamos um interface para valor inicial
*/
    const [data, setData] = useState<IData[]>([]);
    /* Adionando valor de data e mes atual padrão apra useState String(new Date().getFullYear() */
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencyFilterSelected, setfrequencyFilterSelected] = useState(['recorrente', 'eventual']);

/* Destruturar 
    Destruturando a interface com base no type, para se futuramente forem criados mais parametros, todos
    seram exibidos na desestruturação.
*/    
    const  movimentType = match.params.type;


/* useMemo
    useMemo é um hook performatico do React para memorizar valores, ele precisa de um parametro 
    que sempre sera atualizado quando alguma informação for alterada.
    neste caso vai pegar o parametro que for alterado pela rota

*/
    const pageData = useMemo(() => {

        return movimentType === 'entrada' ? {
            title: 'Entradas',
            lineColor: '#4E41F0',
            list: gains
         } : {
            title: 'Saídas',
            lineColor: '#E44C4E',
            list: expens
         } 
    },[movimentType]);   


    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {           
            return {
                value: index + 1,
                label: month
            }          
        });
    }, []);

    
    const year = useMemo(() => {
        let uniqueYears: number[] = [];
        
        pageData.list.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

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
    }, [pageData]);


    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

        if(alreadySelected >= 0){
            const filtered = frequencyFilterSelected.filter(item => item !== frequency)
            setfrequencyFilterSelected(filtered);
        } else {
            setfrequencyFilterSelected((prev) => [...prev, frequency]);
        }
/*
    com a função prev é possível retornar o valor anterior que já estava informado dentro do array
    (prev) => [...prev, valoratual]  "previous!"
*/
    };

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('invalid month value');
        }
    };

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('invalid year value');
        }
    };

/*
    useEffect
    é um Hook do react que é disparado sempre no carregamento da tela.
    e recarrega sempre que o valor informado no colchete for alterado
*/
    

    useEffect(() => {

        const filteredData = pageData.list.filter(item => {
            const date = new Date(item.date);            
            const month = (date.getMonth() + 1);
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
        });


        const response = filteredData.map(item => {
            return  {
                id: uuid(),
                description: item.description,
                amountFormatted: formattedCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formattedDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        });        
        setData(response);
    }, [pageData, monthSelected, yearSelected, frequencyFilterSelected])

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={year} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader> 

            <Filters>                
                <button 
                    type="button" 
/* verificando se o valor esta incluso no frequencyFilterSelected, se estiver adicionar a tag actived */
                    className={`tag-filter tag-filter-eventual                    
                    ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('recorrente')}
                > 
                    Recorrentes 
                </button>

                <button 
                    type="button"                     
/* verificando se o valor esta incluso no frequencyFilterSelected, se estiver adicionar a tag actived */                    
                    className={`tag-filter tag-filter-recorrents
                    ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('eventual')}
                > 
                    Eventuais 
                </button>
            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard   
                            key={item.id}                 
                            tagColor={item.tagColor}
                            title={item.description}
                            subTitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />                    
                    ))
                }                
            </Content>                           
        </Container>
    );
}

export default List;

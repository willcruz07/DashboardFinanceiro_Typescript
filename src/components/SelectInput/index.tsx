import React from 'react';
// import { NumericLiteral } from 'typescript';

import {Container} from './styles';

interface ISelectInputProps {
    options: {
        value: string | number;
        label: string | number;
    }[],
    onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
    defaultValue?: string | number;
    /* o ? indica que que a propriedade é opcional, pode ou não ser informada.  */
};

const SelectInput: React.FC<ISelectInputProps> = ({options, onChange, defaultValue}) => {
    return (
        <Container>
            <select onChange={onChange} defaultValue={defaultValue}>
                {
                    options.map(option => (
                        <option value = {option.value}>{option.label}</option>
                    ))
                }
            </select>
        </Container>
    );
};

export default SelectInput;
import { NumericBoard } from './NumericBoard';
import { CalcInput } from './CalcInput';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import style from './Calc.module.css';
import { OperatorsBoard } from './OperatorsBoard';

interface ContextType {
    lastPressedButton: string
    updateLastPressedButton: Dispatch<SetStateAction<string>>,
}

const contextDefaultValue: ContextType = {
    lastPressedButton: '',
    updateLastPressedButton: () => {
    }
};
export const CalcContext = createContext(contextDefaultValue);

export function Calc() {
    const [lastPressedButton, updateLastPressedButton] = useState('');

    const contextValue: ContextType = {
        lastPressedButton,
        updateLastPressedButton
    };

    return (
        <CalcContext.Provider value={contextValue}>
            <CalcInput className={style.input} />

            <div className={style.boards}>
                <NumericBoard />
                <OperatorsBoard />
            </div>
        </CalcContext.Provider>
    );
}
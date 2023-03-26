import { createContext, Dispatch, SetStateAction, useState } from 'react';

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

        </CalcContext.Provider>
    );
}
import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { CalcContext } from './Calc';
import styles from './CalcButton.module.css';
import { useDispatch } from 'react-redux';
import { appendToCurrentExpression } from '../redux/expressionSlice';

type propsTypes = {
    className?: string,
    children: ReactNode
    onClick?: () => void
}

export function CalcButton({ className = '', children, onClick }: propsTypes) {
    const dispatch = useDispatch();
    const [localClassName, setLocalClassName] = useState('');

    const { lastPressedButton, updateLastPressedButton } = useContext(CalcContext);

    useUpdateAnimationClassName({ lastPressedButton, children, setLocalClassName });

    function clearLastPressedButton() {
        updateLastPressedButton('');
    }

    function appendNumber() {
        dispatch(appendToCurrentExpression({ newInput: children!.toString() }));
    }

    onClick ??= appendNumber;

    return (
        <button
            className={`${className} ${localClassName} ${styles.calcButton}`}
            data-calc-button={children}
            onClick={onClick}
            onAnimationEnd={clearLastPressedButton}
        >
            {children}
        </button>
    );
}

type UseUpdateAnimationClassNameArgument = {
    lastPressedButton: string,
    children: ReactNode,
    setLocalClassName: Dispatch<SetStateAction<string>>
}

function useUpdateAnimationClassName({
                                         lastPressedButton,
                                         children,
                                         setLocalClassName
                                     }: UseUpdateAnimationClassNameArgument) {
    useEffect(() => {
        const isButtonMatch = lastPressedButton === children?.toString();
        setLocalClassName(`${isButtonMatch ? styles.clickAnimation : ''}`);
    }, [lastPressedButton]);
}
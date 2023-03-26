import { ReactNode } from 'react';
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

    function appendNumber() {
        dispatch(appendToCurrentExpression({ newInput: children!.toString() }));
    }

    onClick ??= appendNumber;

    return (
        <button
            className={`${className} ${styles.calcButton}`}
            data-calc-button={children}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
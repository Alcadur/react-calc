import { CalcButton } from './CalcButton';
import style from './OperatorsBoard.module.css';
import { appendToCurrentExpression, evaluateCurrentExpression } from '../redux/expressionSlice';
import { useDispatch } from 'react-redux';

export const printableOperators = ['+', '-', '*', '/', '^', 'sqrt'];
export const functionalOperators = ['='];
export const operators = [...printableOperators, ...functionalOperators];

export function OperatorsBoard() {
    const dispatch = useDispatch();

    function onClickResolver(operator: string): (() => void) | undefined {
        if (operator === '=') {
            return evaluateExpression;
        }

        if (operator === 'sqrt') {
            return insertSqrtWithOpeningBrackets;
        }
    }

    function evaluateExpression() {
        dispatch(evaluateCurrentExpression());
    }

    function insertSqrtWithOpeningBrackets() {
        dispatch(appendToCurrentExpression({ newInput: 'sqrt(' }));
    }

    return (
        <div className={style.operatorsContainer}>
            {operators.map(operator =>
                <CalcButton
                    onClick={onClickResolver(operator)}
                    key={operator}
                >
                    {operator}
                </CalcButton>)}
        </div>
    );
}
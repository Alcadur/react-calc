import { CalcButton } from './CalcButton';
import style from './ExtraBoard.module.css';
import { useDispatch } from 'react-redux';
import { clearCurrentExpression } from '../redux/expressionSlice';

export function ExtraBoard() {
    const options = ['C', '.', '(', ')'];
    const dispatch = useDispatch();

    function clearInput(): void {
        dispatch(clearCurrentExpression());
    }

    return (
        <div className={style.extraBoardWrapper}>
            {options.map(option =>
                <CalcButton
                    onClick={option === 'C' ? clearInput : undefined}
                    key={option}
                >
                    {option}
                </CalcButton>)}
        </div>
    );
}
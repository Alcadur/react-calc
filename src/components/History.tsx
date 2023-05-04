import { setCurrentExpression, useHistorySelector } from '../redux/expressionSlice';
import { useDispatch } from 'react-redux';
import styles from './History.module.css';

export type HistoryProps = {
    className?: string
}

export function History({ className = '' }: HistoryProps) {

    const history = useHistorySelector();
    const dispatch = useDispatch();

    function setExpression(value: string) {
        dispatch(setCurrentExpression(value));
    }

    return (
        <ul className={`${styles.historyList} ${className}`} data-testid="history-container">
            {history.map((row, index) =>
                <li
                    className={styles.historyElement}
                    onClick={() => setExpression(row.value)}
                    key={row.id}
                    title={row.value}
                    data-testid={`history-row-${index}`}
                >
                    {row.value}
                </li>
            )}
        </ul>
    );
}
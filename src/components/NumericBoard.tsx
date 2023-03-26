import styles from './NumericBoard.module.css';
import { CalcButton } from './CalcButton';

export function NumericBoard() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    return (
        <div className={styles.numericKeyboard}>
            {numbers.map(number =>
                <CalcButton
                    key={number}
                >
                    {number}
                </CalcButton>
            )}
        </div>
    );
}
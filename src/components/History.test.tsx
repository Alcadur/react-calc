import { describe, expect, test } from 'vitest';
import { ExpressionState, HistoryRow } from '../redux/expressionSlice';
import { renderWithProviders } from '../helopers/testHelpers';
import { History } from './History';
import userEvent from '@testing-library/user-event';

describe('History', function () {
    function prepare(history: HistoryRow[] = []) {
        const initState = { expression: { history } as unknown as ExpressionState };

        return { initState };
    }

    describe('render', function () {
        describe('when there is no history expressions', function () {
            test('should render empty list', function () {
                const { initState } = prepare();

                const { getByTestId } = renderWithProviders(<History />, { initState });

                const container = getByTestId('history-container');

                expect(container.querySelectorAll('li')).empty;
            });
        });

        describe('when there are historic rows', function () {
            test('should render rows', function () {
                const history = [
                    { id: '1', value: '1+1' },
                    { id: '2', value: '1-2' }
                ];
                const { initState } = prepare(history);

                const { getByTestId } = renderWithProviders(<History />, { initState });

                const row1 = getByTestId('history-row-0');
                const row2 = getByTestId('history-row-1');

                expect(row1.textContent).toEqual(history[0].value);
                expect(row1.title).toEqual(history[0].value);
                expect(row2.textContent).toEqual(history[1].value);
                expect(row2.title).toEqual(history[1].value);
            });
        });

        describe('when there is extra className property', function () {
            test('should extend container className',
                function () {
                    const extraClass = 'super-duper-style';

                    const { getByTestId } = renderWithProviders(<History className={extraClass} />);

                    const container = getByTestId('history-container');
                    expect(
                        container.classList.contains(extraClass),
                        `container className should contain ${extraClass} class`
                    ).toBe(true);
                });
        });
    });

    describe('on item click', function () {
        test('should store value', async function () {
            const history = [{ id: '1', value: '42-12' }];
            const { initState } = prepare(history);

            const { store, getByTestId } = renderWithProviders(<History />, { initState });

            await userEvent.click(getByTestId('history-row-0'));

            expect(store.getState().expression.current).toEqual(history[0].value);
        });
    });
});
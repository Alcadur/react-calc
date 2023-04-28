import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { renderWithProviders } from '../helopers/testHelpers';
import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import { CalcInput } from './CalcInput';
import userEvent from '@testing-library/user-event';
import { RootState } from '../redux/store';
import { ExpressionState } from '../redux/expressionSlice';

describe('CalcInput', function () {

    let initState: RootState;

    beforeEach(() => {
        initState = { expression: { current: '', wasUpdated: false } as ExpressionState};
    });

    afterEach(() => {
        cleanup();
    });

    test('should not allow user select expression', async function () {
        initState.expression.current = '12+21';
        const { store, getByTestId } = renderWithProviders(<CalcInput />, {
            initState
        });

        const input = getByTestId('expression-input');

        await userEvent.type(input, '0', { initialSelectionStart: 2, initialSelectionEnd: 4 });

        expect(store.getState().expression.current).toEqual('120+21');
    });

    describe('when user enter character', function () {
        test('should update store value', async function () {
            initState.expression.current = '123';
            const { store, getByTestId } = renderWithProviders(<CalcInput />, {
                initState
            });

            const input = getByTestId('expression-input');

            await userEvent.type(input, '2');

            expect(store.getState().expression.current).toEqual('1232');
        });
    });

    describe('when user change position and enter character', function () {
        test('should update selection start', async function () {
            initState.expression.current = '1234';
            const { getByTestId } = renderWithProviders(<CalcInput />, {
                initState
            });

            const input = getByTestId('expression-input') as HTMLInputElement;

            await userEvent.click(input);
            await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
            await userEvent.type(input, '9', { skipClick: true });
            await userEvent.keyboard('{ArrowRight}');
            await userEvent.type(input, '+', { skipClick: true });

            expect(input.value).toEqual('1293+4');
        });
    });

    describe('when user enter not allowed character', function () {
        test('should not change selection position', async function () {
            initState.expression.current = '1234';
            const { getByTestId } = renderWithProviders(<CalcInput />, {
                initState
            });

            const input = getByTestId('expression-input') as HTMLInputElement;

            await userEvent.type(input, ')', { initialSelectionStart: 2 });
            await userEvent.type(input, '0', { skipClick: true });

            expect(input.value).toEqual('12034');
        });

        describe('and change selection position', function () {
            test('should not change selection position', async function () {
                initState.expression.current = '1234';
                const { getByTestId } = renderWithProviders(<CalcInput />, {
                    initState
                });

                const input = getByTestId('expression-input') as HTMLInputElement;

                await userEvent.type(input, ')', { initialSelectionStart: 3 });
                await userEvent.keyboard('{ArrowLeft}');
                await userEvent.type(input, '0', { skipClick: true });

                expect(input.value).toEqual('12034');
            });
        });
    });

    describe('when user remove sqrt', function () {
        describe('and sqrt is completed', function () {
            test('should remove sqrt and next closing bracket', async function () {
                initState.expression.current = '12+sqrt(12)+43(2+2)';
                const { store, getByTestId } = renderWithProviders(<CalcInput />, {
                    initState
                });

                const input = getByTestId('expression-input');
                await userEvent.click(input);
                await userEvent.keyboard('{ArrowLeft>11/}{Backspace}');

                expect(store.getState().expression.current).toEqual('12+12+43(2+2)');
            });
        });

        describe('and sqrt is don\'t have closing bracket', function () {
            test('should remove sqrt and next closing bracket', async function () {
                initState.expression.current = '5+sqrt(9+43(2+2)';
                const { store, getByTestId } = renderWithProviders(<CalcInput />, {
                    initState
                });

                const input = getByTestId('expression-input');
                await userEvent.click(input);
                await userEvent.keyboard('{ArrowLeft>9/}{Backspace}');

                expect(store.getState().expression.current).toEqual('5+9+43(2+2)');
            });
        });
    });

    describe('when user navigate by arrows and reach sqrt operator', function () {
        test('should selector should be moved to the opposite site of the sqrt', async function () {
            initState.expression.current = '8+sqrt(5)*2';
            const { getByTestId } = renderWithProviders(<CalcInput />, {
                initState
            });

            const input = getByTestId('expression-input') as HTMLInputElement;
            await userEvent.click(input);
            input.setSelectionRange(2, 2); // 8+|sqrt(5)*2
            await userEvent.keyboard('{ArrowRight}');
            expect(input.selectionStart).toEqual(7);

            // 8+sqrt(|5)*2
            await userEvent.keyboard('{ArrowLeft}');
            expect(input.selectionStart).toEqual(2);
        });
    });

    describe('when user slick in middle of sqrt', function () {
        describe('and click between s and q', function () {
            test('should move selector to the beginning of sqrt', async function () {
                initState.expression.current = '1+sqrt(9)+1';
                const { getByTestId } = renderWithProviders(<CalcInput />, {
                    initState
                });

                const input = getByTestId('expression-input') as HTMLInputElement;
                await userEvent.click(input);
                input.setSelectionRange(3, 3); // 1+s|qrt(9)+1
                fireEvent.mouseUp(input);

                expect(input.selectionStart).toEqual(2);
            });
        });

        describe('and click between q and r', function () {
            test('should move selector to the beginning of sqrt', async function () {
                initState.expression.current = '1+sqrt(9)+1';
                const { getByTestId } = renderWithProviders(<CalcInput />, {
                    initState
                });

                const input = getByTestId('expression-input') as HTMLInputElement;
                await userEvent.click(input);
                input.setSelectionRange(4, 4); // 1+sq|rt(9)+1
                fireEvent.mouseUp(input);

                expect(input.selectionStart).toEqual(2);
            });
        });

        describe('and click between r and t', function () {
            test('should move selector before opening bracket', async function () {
                initState.expression.current = '1+sqrt(9)+1';
                const { getByTestId } = renderWithProviders(<CalcInput />, {
                    initState
                });

                const input = getByTestId('expression-input') as HTMLInputElement;
                await userEvent.click(input);
                input.setSelectionRange(5, 5); // 1+sqr|t(9)+1
                fireEvent.mouseUp(input);


                expect(input.selectionStart).toEqual(7);
            });
        });

        describe('and click between t and (', function () {
            test('should move selector before opening bracket', async function () {
                initState.expression.current = '1+sqrt(9)+1';
                const { getByTestId } = renderWithProviders(<CalcInput />, {
                    initState
                });

                const input = getByTestId('expression-input') as HTMLInputElement;
                await userEvent.click(input);
                input.setSelectionRange(6, 6); // 1+sqrt|(9)+1
                fireEvent.mouseUp(input);

                expect(input.selectionStart).toEqual(7);
            });
        });
    });
});
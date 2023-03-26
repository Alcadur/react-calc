import { describe, expect, test, vi } from 'vitest';
import { CalcButton } from './CalcButton';
import { renderWithProviders } from '../helopers/testHelpers';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { RootState } from '../redux/store';

describe('CalcButton', function () {
    describe('when user click on a button', function () {
        test('should update store value', async function () {
            const initState = { expression: { current: '333' } } as RootState;

            const { store, getByText } = renderWithProviders(<CalcButton>1</CalcButton>, {
                initState
            });

            await userEvent.click(getByText('1'));

            expect(store?.getState().expression.current).toEqual('3331');
        });

        describe('and there is custom click handler', function () {
            test('should call custom handler', async function () {
                const initState = { expression: { current: '11' } } as RootState;
                const customClick = vi.fn();


                const { store, getByText } = renderWithProviders(<CalcButton onClick={customClick}>5</CalcButton>, {
                    initState
                });

                await userEvent.click(getByText('5'));

                expect(store?.getState().expression.current).toEqual('11');
                expect(customClick).toHaveBeenCalledOnce();
            });
        });
    });
});
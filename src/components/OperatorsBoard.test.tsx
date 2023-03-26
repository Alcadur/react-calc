import { afterEach, describe, expect, test } from 'vitest';
import { renderWithProviders } from '../helopers/testHelpers';
import { cleanup } from '@testing-library/react';
import { operators, OperatorsBoard } from './OperatorsBoard';
import userEvent from '@testing-library/user-event';

describe('OperatorsBoard', function () {

    afterEach(() => {
        cleanup();
    });

    describe('render', function () {
        test('should render all buttons', function () {
            const { getByText } = renderWithProviders(<OperatorsBoard />);

            expect(getByText('+')).exist;
            expect(getByText('-')).exist;
            expect(getByText('*')).exist;
            expect(getByText('/')).exist;
            expect(getByText('^')).exist;
            expect(getByText('sqrt')).exist;
            expect(getByText('=')).exist;
            expect.assertions(operators.length);
        });
    });

    describe('custom "=" handle', function () {
        test('should evaluate expression', async function () {
            const initState = { expression: { current: '12+12', history: [] } } as any;
            const { store, getByText } = renderWithProviders(<OperatorsBoard />, {
                initState
            });

            await userEvent.click(getByText('='));

            expect(store.getState().expression.current).toEqual('24');
        });
    });

    describe('custom "sqrt" handle', function () {
        test('should append sqrt with brackets', async function () {
            const initState = { expression: { current: '', history: [] } } as any;
            const { store, getByText } = renderWithProviders(<OperatorsBoard />, {
                initState
            });

            await userEvent.click(getByText('sqrt'));

            expect(store.getState().expression.current).toEqual('sqrt(');
        });
    });
});
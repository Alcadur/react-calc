import { afterEach, describe, expect, test } from 'vitest';
import { ExtraBoard } from './ExtraBoard';
import { renderWithProviders } from '../helopers/testHelpers';
import { cleanup, fireEvent } from '@testing-library/react';
import { RootState } from '../redux/store';

describe('ExtraBoard', function () {

    afterEach(() => {
        cleanup()
    });

    describe('render', function () {
        test('should render all buttons', function () {
            const { getByText } = renderWithProviders(<ExtraBoard />);

            expect(getByText('(')).exist;
            expect(getByText(')')).exist;
            expect(getByText('C')).exist;
        });
    });

    describe('custom "C" handle', function () {
        test('should clear expression value in store', function () {
            const initState = { expression: { current: '123+32' } } as RootState;
            const { store, getByText } = renderWithProviders(<ExtraBoard />, {
                initState
            });

            fireEvent.click(getByText('C'));

            expect(store.getState().expression.current).toEqual('');
        });
    });
});
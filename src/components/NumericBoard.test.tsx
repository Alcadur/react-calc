import { afterEach, describe, expect, test } from 'vitest';
import { renderWithProviders } from '../helopers/testHelpers';
import { cleanup } from '@testing-library/react';
import { NumericBoard } from './NumericBoard';

describe('NumericBoard', function () {

    afterEach(() => {
        cleanup();
    });

    describe('render', function () {
        test('should render all buttons', function () {
            const { getByText } = renderWithProviders(<NumericBoard />);

            expect(getByText('1')).exist;
            expect(getByText('2')).exist;
            expect(getByText('3')).exist;
            expect(getByText('4')).exist;
            expect(getByText('5')).exist;
            expect(getByText('6')).exist;
            expect(getByText('7')).exist;
            expect(getByText('8')).exist;
            expect(getByText('9')).exist;
            expect(getByText('0')).exist;
        });
    });
});
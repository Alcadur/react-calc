import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { validateInput } from '../helopers/inputHelper';
import { evaluate } from 'mathjs';

export interface ExpressionState {
    current: string,
    wasUpdated: boolean,
    history: Array<string>
}

const initialState: ExpressionState = {
    current: '',
    wasUpdated: false,
    history: []
};

type CurrentExpressionSetPayload = {
    currentValue: string,
    updatedValue: string,
    newInput: string | null,
    inputPosition?: number | null,
}

type CurrentExpressionAppendPayload = {
    newInput: string
}

const expressionSlice = createSlice({
    name: 'expression',
    initialState,
    reducers: {
        clearExpression(state) {
            state.current = '';
        },
        setCurrent(state, { payload }: PayloadAction<CurrentExpressionSetPayload>) {
            state.wasUpdated = false;

            if (validateInput(payload)) {
                state.current = payload.updatedValue;
                state.wasUpdated = true;
            }
        },
        appendToCurrent(state, { payload }: PayloadAction<CurrentExpressionAppendPayload>) {
            const { current } = state;
            const { newInput } = payload;
            if (validateInput({
                currentValue: current,
                newInput
            })) {
                state.current = `${current}${newInput}`;
            }
        },
        evaluate(state) {
            state.history.unshift(state.current);
            state.current = evaluate(state.current).toString();
            state.history.unshift(state.current);
        }
    }
});

export const {
    setCurrent: setCurrentExpression,
    appendToCurrent: appendToCurrentExpression,
    clearExpression: clearCurrentExpression,
    evaluate: evaluateCurrentExpression
} = expressionSlice.actions;

export const useExpressionCurrentSelector = () => useSelector((store: RootState) => store.expression.current);
export const useExpressionWasUpdatedSelector = () => useSelector((store: RootState) => store.expression.wasUpdated);

export default expressionSlice.reducer;
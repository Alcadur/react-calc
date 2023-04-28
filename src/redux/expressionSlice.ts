import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { validateInput } from '../helopers/inputHelper';
import { evaluate } from 'mathjs';

export interface ExpressionState {
    current: string,
    lastUpdatedPosition: number
    wasUpdated: boolean,
    history: Array<string>
}

const initialState: ExpressionState = {
    current: '',
    lastUpdatedPosition: 1,
    wasUpdated: false,
    history: []
};

type CurrentExpressionSetPayload = {
    currentValue: string,
    updatedValue: string,
    newInput: string | null,
    inputPosition?: number | null,
}

type CurrentExpressionAddPayload = {
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
                state.lastUpdatedPosition = payload.inputPosition!;
                state.wasUpdated = true;
            }
        },
        addToCurrent(state, { payload }: PayloadAction<CurrentExpressionAddPayload>) {
            const { current, lastUpdatedPosition } = state;
            const { newInput } = payload;

            if (validateInput({
                currentValue: current,
                newInput,
                inputPosition: lastUpdatedPosition
            })) {
                state.current = `${current.substring(0, lastUpdatedPosition-1)}${newInput}${current.substring(lastUpdatedPosition-1)}`;
                state.lastUpdatedPosition = state.lastUpdatedPosition + newInput.length;
            }
        },
        setLastUpdatedPosition(state, { payload }: PayloadAction<number>) {
            state.lastUpdatedPosition = payload
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
    addToCurrent: addToCurrentExpression,
    clearExpression: clearCurrentExpression,
    evaluate: evaluateCurrentExpression,
    setLastUpdatedPosition: setExpressionLastUpdatedPosition
} = expressionSlice.actions;

export const useExpressionCurrentSelector = () => useSelector((store: RootState) => store.expression.current);
export const useExpressionWasUpdatedSelector = () => useSelector((store: RootState) => store.expression.wasUpdated);
export const useExpressionLastUpdatedPositionSelector = () => useSelector((store: RootState) => store.expression.lastUpdatedPosition);

export default expressionSlice.reducer;
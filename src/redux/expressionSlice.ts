import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { validateInput } from '../helopers/inputHelper';
import { evaluate } from 'mathjs';

export interface ExpressionState {
    current: string,
    lastUpdatedPosition: number
    wasUpdated: boolean,
    history: Array<HistoryRow>
}

export type HistoryRow = {
    id: string,
    value: string,
}

const initialState: ExpressionState = {
    current: '',
    lastUpdatedPosition: 1,
    wasUpdated: false,
    history: []
};

type CurrentExpressionUpdatePayload = {
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
            state.lastUpdatedPosition = 1;
        },
        updateCurrent(state, { payload }: PayloadAction<CurrentExpressionUpdatePayload>) {
            state.wasUpdated = false;

            if (validateInput(payload)) {
                state.current = payload.updatedValue;
                state.lastUpdatedPosition = payload.inputPosition!;
                state.wasUpdated = true;
            }
        },
        setExpression(state, { payload }: { payload: string }) {
            state.current = payload;
            state.lastUpdatedPosition = payload.length + 1;
        },
        addToCurrent(state, { payload }: PayloadAction<CurrentExpressionAddPayload>) {
            const { current, lastUpdatedPosition } = state;
            const { newInput } = payload;

            if (validateInput({
                currentValue: current,
                newInput,
                inputPosition: lastUpdatedPosition
            })) {
                state.current = `${current.substring(0, lastUpdatedPosition - 1)}${newInput}${current.substring(lastUpdatedPosition - 1)}`;
                state.lastUpdatedPosition = state.lastUpdatedPosition + newInput.length;
            }
        },
        setLastUpdatedPosition(state, { payload }: PayloadAction<number>) {
            state.lastUpdatedPosition = payload;
        },
        evaluate(state) {
            const beforeEvaluate = state.current;
            state.current = evaluate(state.current).toString();
            if (beforeEvaluate !== state.current) {
                state.history.unshift({ id: crypto.randomUUID().toString(), value: beforeEvaluate });
            }
        }
    }
});

export const {
    updateCurrent: updateCurrentExpression,
    addToCurrent: addToCurrentExpression,
    clearExpression: clearCurrentExpression,
    evaluate: evaluateCurrentExpression,
    setLastUpdatedPosition: setExpressionLastUpdatedPosition,
    setExpression: setCurrentExpression
} = expressionSlice.actions;

export const useExpressionCurrentSelector = () => useSelector((store: RootState) => store.expression.current);
export const useExpressionWasUpdatedSelector = () => useSelector((store: RootState) => store.expression.wasUpdated);
export const useExpressionLastUpdatedPositionSelector = () => useSelector((store: RootState) => store.expression.lastUpdatedPosition);
export const useHistorySelector = () => useSelector((store: RootState) => store.expression.history);

export default expressionSlice.reducer;
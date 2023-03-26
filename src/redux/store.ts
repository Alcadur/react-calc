import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import expression from './expressionSlice'

const rootReducer = combineReducers({
    expression
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

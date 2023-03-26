import { PropsWithChildren, ReactElement } from 'react';
import { PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { AppStore, RootState, setupStore } from '../redux/store';
import { Provider } from 'react-redux';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    initState?: PreloadedState<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: ReactElement,
    {
        initState = {},
        store = setupStore(initState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {

    function Wrapper({ children }: PropsWithChildren): JSX.Element {
        return <Provider store={store}>{children}</Provider>;
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
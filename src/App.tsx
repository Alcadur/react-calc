import { Calc } from './components/Calc';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Calc/>
            </div>
        </Provider>
    );
}

export default App;

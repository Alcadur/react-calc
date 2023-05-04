import { Calc } from './components/Calc';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { History } from './components/History';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Calc />
                <History className="history-panel" />
            </div>
        </Provider>
    );
}

export default App;

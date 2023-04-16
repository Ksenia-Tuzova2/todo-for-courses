import * as serviceWorker from './app/serviceWorker';
import { store } from './store/redux-store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { dividerClasses } from '@mui/material';


import App from './app/App';


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


// If you want your app to work offline and load faster,
// you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

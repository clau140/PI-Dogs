import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducer/index';

//thunk es un middelwere que nos ayuda a trabajar con asincronía, por si solo redux no sabe manejar asincronia
//middelwere es un mediador, es un fn que se va a ejecutar antes que continue el flujo de info
import thunkMiddleware from 'redux-thunk'


const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta linea

export const store = createStore(
    reducer,
    composeEnhacer(applyMiddleware(thunkMiddleware))); // Esta linea nos permite hacer petic

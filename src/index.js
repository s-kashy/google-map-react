import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import listReducer from "./Store/reducer/reducer"
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import * as serviceWorker from './serviceWorker';
const composeEnhancers =
    process.env.NODE_ENV === "development"
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose;
const rooReducer = combineReducers({
    map: listReducer
});
const store = createStore(rooReducer, composeEnhancers(applyMiddleware(thunk)));
const app = (
    <Provider store={store}>
        <App />
    </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

const reducer = combineReducers(reducers);

export default function configureStore() {
    return createStore(
        reducer,
        composeWithDevTools(
            applyMiddleware(thunk),
        ),
    );
}

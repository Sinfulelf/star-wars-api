import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { initialState, rootReducer } from '../reducer';

function configureStore(initialState) {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  let middleware = composeEnhancers(applyMiddleware(thunk));
  const store = createStore(rootReducer, initialState, middleware);
  return store;
}

const store = configureStore(initialState);

export default store;
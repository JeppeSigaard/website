import React from 'react';
import ReactDOM from 'react-dom';
import FalmerApplication from '~falmer/containers/FalmerApplication';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const link = new HttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://falmer.sussexstudent.com/graphql/'
      : 'http://localhost:8000/graphql/',
  // Additional fetch options like `credentials` or `headers`
  credentials: 'same-origin',
  headers: {
    'X-CSRFToken': (window as any).CSRF,
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(saga);

ReactDOM.render(
  <ApolloProvider client={client as any}>
    <Provider store={store}>
      <FalmerApplication />
    </Provider>
  </ApolloProvider>,
  document.querySelector('.FalmerAppRoot'),
);

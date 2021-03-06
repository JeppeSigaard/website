import ReactDOM from 'react-dom';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import WebsiteApplication from '~website/containers/WebsiteApplication';
import { store } from '~website/redux/store';
import { AppMountState } from '~website/ducks/router';
import getApolloClientForFalmer from '~libs/getApolloClientForFalmer';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from '~components/BrowserRouter';

export default function ready(
  container: any,
  appMountState: AppMountState = AppMountState.Initial,
) {
  ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={getApolloClientForFalmer}>
        <ReduxProvider store={store}>
          <WebsiteApplication appMountState={appMountState} />
        </ReduxProvider>
      </ApolloProvider>
    </BrowserRouter>,
    container,
  );
}

import React from 'react';
import { Granule, createStore } from '@brudil/granule';
import getFalmerEndpoint from '~libs/getFalmerEndpoint';

const store = createStore();

export const GranuleQuery = (props: any) => (
  <Granule
    endpoint={`${getFalmerEndpoint()}/graphql/`}
    store={store}
    {...props}
  >
    {props.children}
  </Granule>
);

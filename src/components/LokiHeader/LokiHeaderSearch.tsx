import React from 'react';
import bind from 'bind-decorator';
import { WebsiteRootState } from '~types/website';
import { connect } from 'react-redux';
import * as routerActions from '../../projects/website/ducks/router';
import { RouterState } from '~website/ducks/router';

interface LokiHeaderSearchProps {
  router: RouterState;
  setSearchValue: typeof routerActions.setSearchValue;
}

interface LokiHeaderSearchState {
  query: string;
}

class LokiHeaderSearchComponent extends React.Component<
  LokiHeaderSearchProps,
  LokiHeaderSearchState
> {
  private input?: null | HTMLInputElement;

  @bind
  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.setSearchValue(e.target.value);
  }

  render() {
    return (
      <div className="LokiHeader__search">
        <input
          id="HP_QUERY_ELEMENT_SIDE_EFFECT"
          className="LokiHeader__search-input"
          type="search"
          placeholder="Search"
          value={this.props.router.searchQuery}
          onChange={this.onChange}
          ref={(ref) => (this.input = ref)}
        />
      </div>
    );
  }
}

export const LokiHeaderSearch = connect(
  (state: WebsiteRootState) => ({
    router: state.router,
  }),
  {
    setSearchValue: routerActions.setSearchValue,
  },
)(LokiHeaderSearchComponent as any);

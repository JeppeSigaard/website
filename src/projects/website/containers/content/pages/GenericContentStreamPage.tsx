import React from 'react';
import { Page, StreamFieldData } from '~website/containers/content/types';
import StreamField from '~website/containers/content/StreamField';

interface GenericContentStreamPage extends Page {
  body: StreamFieldData;
}

interface IProps {
  page: GenericContentStreamPage;
}

class GenericContentStreamPage extends React.Component<IProps> {
  render() {
    const {
      page: { body },
      page,
    } = this.props;
    return (
      <div className="LokiContainer">
        <div className="Layout">
          <StreamField items={body} page={page} />
        </div>
      </div>
    );
  }
}

export default GenericContentStreamPage;

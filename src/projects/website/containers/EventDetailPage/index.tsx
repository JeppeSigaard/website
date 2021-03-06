import React from 'react';
import cx from 'classnames';
import bind from 'bind-decorator';
import { ChildProps, graphql } from 'react-apollo';
import ContentCard from '~components/ContentCard';
import Loader from '~components/Loader';
import DetailPageQuery from './EventsDetailPage.graphql';
import EventsCalenderItem from '../EventsCalender/EventsCalenderItem';
import { Event, TicketType } from '~types/events';

import apolloHandler from '~components/apolloHandler';
import { AspectRatio, OneImageBackground } from '~components/OneImage';
import { EventDetailDetails } from '~website/containers/EventDetailPage/EventDetailDetails';
import { EventDetailSidebar } from '~website/containers/EventDetailPage/EventDetailSidebar';
import { MSLEventCommunication } from '~website/containers/EventDetailPage/MSLEventCommunication';
import { EventDetailMetadata } from '~website/containers/EventDetailPage/EventDetailMetadata';
import PatternPlaceholder from '~components/PatternPlaceholder';
import Button from '~components/Button';
// import { TicketsModal } from '~website/containers/EventDetailPage/TicketsModal';
import { RouteComponentProps } from 'react-router-dom';
import { ScrollToTop } from '~components/ScrollToTop';

interface RouteParams {
  [0]: string;
  eventId: number;
}

interface OwnProps extends RouteComponentProps<RouteParams> {}

type IProps = OwnProps & ChildProps<OwnProps, any>;

interface IState {
  msl: any;
  ticketModalOpen: boolean;
}

class EventDetailPage extends React.Component<IProps, IState> {
  state = {
    msl: null,
    ticketModalOpen: false,
  };

  componentDidUpdate() {
    if (!this.props.data || !this.props.data.event) {
      return;
    }

    const event = this.props.data.event;
    if (this.props.match.params[0] !== event.slug) {
      this.props.history.replace(`/whats-on/${event.slug}-${event.eventId}`);
    }
  }

  @bind
  handleMslCommunication(data: any) {
    this.setState({ msl: data });
  }

  @bind
  handleOpenTicketModal() {
    this.setState({ ticketModalOpen: true });
  }

  @bind
  handleCloseTicketModal() {
    this.setState({ ticketModalOpen: false });
  }

  render() {
    if (!this.props.data || this.props.data.loading) {
      return <Loader />;
    }

    const event = this.props.data.event;

    return (
      <ScrollToTop>
        <div
          className={cx('EventDetail', {
            'EventDetail--customImage': event.featuredImage,
          })}
        >
          <EventDetailMetadata event={event} />
          {event.featuredImage ? (
            <div className="EventDetail__hero">
              <div className="LokiContainer">
                <OneImageBackground
                  className="EventDetail__hero-container"
                  aspectRatio={AspectRatio.r20by9}
                  src={event.featuredImage.resource}
                >
                  <div className="EventDetail__details">
                    <EventDetailDetails event={event} />
                  </div>
                </OneImageBackground>
              </div>

              <OneImageBackground
                className="EventDetail__hero-bg"
                aspectRatio={AspectRatio.r20by9}
                src={event.featuredImage.resource}
              />
            </div>
          ) : (
            <div className="EventDetail__hero">
              <div className="EventDetail__hero-container">
                <div className="EventDetail__details">
                  <div className="LokiContainer">
                    <EventDetailDetails event={event} />
                  </div>
                </div>
              </div>
              <div className="EventDetail__hero-bg">
                <PatternPlaceholder />
              </div>
            </div>
          )}
          <div className="LokiContainer">
            <div className="Layout--sidebar-right">
              <ContentCard bleed>
                <div className="ContentCard__content">
                  <div className="Prose type-body-copy">
                    {event.bodyHtml !== '' ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: event.bodyHtml }}
                      />
                    ) : (
                      <div>{event.shortDescription}</div>
                    )}
                    {event.brand && event.brand.eventAppend ? (
                      <div className="type-long-primer">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: event.brand.eventAppend,
                          }}
                        />
                      </div>
                    ) : null}
                  </div>

                  {event.venue ? (
                    <div>
                      <h3>{event.venue.name}</h3>
                      {event.venue.websiteLink ? (
                        <Button href={event.venue.websiteLink}>
                          More information
                        </Button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </ContentCard>
              <div>
                <EventDetailSidebar
                  event={event}
                  msl={this.state.msl}
                  onTicketButton={this.handleOpenTicketModal}
                />
              </div>
            </div>
            {event.children.length > 0 ? (
              <div>
                <span className="u-position-anchor" id="sub-events" />
                <h2 className="Heading Heading--tight">Part of this event</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {event.children.map((childEvent: Event) => (
                    <div>
                      <EventsCalenderItem part={{ event: childEvent }} />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {event.ticketType === TicketType.MSL ? (
              <MSLEventCommunication
                ticketData={event.ticketData}
                onData={this.handleMslCommunication}
              />
            ) : null}

            {/*{event.ticketType === TicketType.MSL ? (*/}
            {/*<TicketsModal*/}
            {/*isOpen={this.state.ticketModalOpen}*/}
            {/*onRequestClose={this.handleCloseTicketModal}*/}
            {/*msl={this.state.msl}*/}
            {/*/>*/}
            {/*) : null}*/}
          </div>
        </div>
      </ScrollToTop>
    );
  }
}

export default graphql<any, OwnProps>(DetailPageQuery, {
  options: ({ match }) => ({ variables: { eventId: match.params.eventId } }),
})(apolloHandler()(EventDetailPage));

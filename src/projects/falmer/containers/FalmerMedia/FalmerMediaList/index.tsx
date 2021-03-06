import React from 'react';
import ALL_MEDIA_QUERY from './AllMedia.graphql';
import FauxRouterLink from '~components/FauxRouterLink';
import { Connection } from '~types/falmer';
import { FalmerImage } from '~types/events';
import { OneImage } from '~components/OneImage';
import { HandledQuery } from '~components/HandledQuery';
import { adopt } from '~components/Adopt';
import { SimpleLoadableRoute } from '~types/routes';

interface IProps {}

interface Result {
  data: {
    allImages: Connection<FalmerImage>;
  };
}

interface RenderProps {
  allMedia: Result;
}

class AllMediaQuery extends HandledQuery<Result, {}> {}

const Compose = adopt<RenderProps, IProps>({
  allMedia: ({ render }) => (
    <AllMediaQuery query={ALL_MEDIA_QUERY}>{render}</AllMediaQuery>
  ),
});

function FalmerMediaList(props: IProps) {
  return (
    <Compose {...props}>
      {({ allMedia }) => {
        const { allImages } = allMedia.data;
        return (
          <div>
            <ul className="FalmerMediaGrid">
              {allImages.edges.map((edge) => (
                <li className="FalmerMediaGrid__item">
                  <div
                    className="u-responsive-fit"
                    style={{
                      height: '110px',
                      width: `${Math.round(
                        110 * (edge.node.width / edge.node.height),
                      )}px`,
                    }}
                  >
                    <FauxRouterLink href={`/media/${edge.node.mediaId}`} />
                    <OneImage
                      src={edge.node.resource}
                      aspectRatio={{
                        width: edge.node.width,
                        height: edge.node.height,
                      }}
                      alt=""
                    />
                  </div>
                </li>
              ))}
            </ul>
            {allImages.pageInfo.hasNextPage ? (
              <button className="Button">Load more</button>
            ) : (
              <em>{`That's your lot!`}</em>
            )}
          </div>
        );
      }}
    </Compose>
  );
}

export default FalmerMediaList as SimpleLoadableRoute;

// DEPRECIATED: Use ~components/HeadingHero
import React from 'react';

interface IProps {
  imageURL: string;
  title: string;
  description?: string;
}

const HeadingImage = ({ imageURL, title, description }: IProps) => (
  <div
    className="HeadingImage"
    style={{
      backgroundImage: `url(${imageURL}?thumbnail=true&height=700&width=2000&resize_type=CropToFit)`,
    }}
  >
    <h1 className="HeadingImage__title">{title}</h1>
    {description ? (
      <div>
        <div className="HeadingImage__desc">{description}</div>
      </div>
    ) : null}
  </div>
);

export default HeadingImage;

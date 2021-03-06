import React from 'react';
import { OneImageBackground } from '~components/OneImage';

interface IProps {
  link: string;
  imageURL: string;
  title: string;
}

const SelectionGridItem = ({ link, imageURL, title }: IProps) => (
  <li className="SelectionGrid__item SelectionGrid--underneath" key={link}>
    <a className="SelectionGrid__link" href={link}>
      <OneImageBackground className="SelectionGrid__image" src={imageURL}>
        <div className="SelectionGrid__image-inside">
          <div className="SelectionGrid__title">{title}</div>
        </div>
      </OneImageBackground>
    </a>
  </li>
);

export default SelectionGridItem;

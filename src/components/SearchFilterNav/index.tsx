import React from 'react';
import cx from 'classnames';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import { SectionbarItem } from '~components/Sectionbar';

interface Option {
  key: any;
  title: string;
  count: number;
}

interface IItemProps {
  currentValue: any;
  itemKey: any;
  option: Option;
  query: string;
}

function SearchFilterItem(props: IItemProps) {
  const { currentValue, option, query, itemKey } = props;

  const count = itemKey !== 'top' ? <span> {`(${option.count})`}</span> : null;

  return (
    <SectionbarItem
      className={cx('Sectionbar__menu-item')}
      active={currentValue === option.key}
      disabled={option.count <= 0}
      key={option.key}
    >
      {option.count > 0 ? (
        <Link to={`/search?${qs.stringify({ q: query, area: option.key })}`}>
          {option.title}
          {count}
        </Link>
      ) : (
        <span>
          {option.title}
          {count}
        </span>
      )}
    </SectionbarItem>
  );
}

interface IProps {
  value: any;
  options: Option[];
  query: string;
}

function SearchFilterNav({ value, options, query }: IProps) {
  return (
    <React.Fragment>
      {options.map((option) => (
        <SearchFilterItem
          key={option.key}
          itemKey={option.key}
          query={query}
          option={option}
          currentValue={value}
        />
      ))}
    </React.Fragment>
  );
}

export default SearchFilterNav;

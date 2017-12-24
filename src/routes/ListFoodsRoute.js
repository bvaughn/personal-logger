// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import List from 'react-virtualized/dist/es/List';
import { LOCALE_DATE_OPTIONS, LOCALE_TIME_OPTIONS, ROUTES } from '../constants';
import { CreateIcon, DrinkIcon, FoodIcon } from '../components/SvgIcons';
import LoadingSpinner from '../components/LoadingSpinner';

import type { Food, RowRendererParams } from '../types';

type Props = {
  foods: Array<Food> | null,
  cssStyle: Object,
};

export default class ListFoods extends Component<Props> {
  render() {
    const { foods, cssStyle } = this.props;

    if (foods === null) {
      return <LoadingSpinner />;
    } else {
      return [
        <AutoSizer key="AutoSizer">
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={foods.length}
              rowHeight={54 /* 3rem */}
              rowRenderer={this._rowRenderer}
            />
          )}
        </AutoSizer>,

        <Link
          className="create-link"
          key="Link"
          to={ROUTES.foods.new}
          {...cssStyle}
        >
          <CreateIcon className="create-link-svg" />
        </Link>,
      ];
    }
  }

  _rowRenderer = ({ key, index, style }: RowRendererParams) => {
    // $FlowFixMe We know this is not null in this case
    const food = this.props.foods[index];

    return (
      <Link
        className="list-entry"
        key={key}
        params={{ id: food.id }}
        style={style}
        to={ROUTES.foods.editLink(food)}
      >
        <div className="list-entry-title">
          <TypeIcon type={food.type} />
          <div className="nowrap">{food.title}</div>
        </div>
        <div className="list-entry-time">
          {food.date.toLocaleTimeString('en-US', LOCALE_TIME_OPTIONS)}
        </div>
        <small className="list-entry-date">
          ({food.date.toLocaleDateString('en-US', LOCALE_DATE_OPTIONS)})
        </small>
      </Link>
    );
  };
}

const TypeIcon = ({ type }) => {
  switch (type) {
    case 'drink':
      return <DrinkIcon className="list-entry-rating-icon" />;
    case 'food':
      return <FoodIcon className="list-entry-rating-icon" />;
    default:
      throw Error(`Invalid type "${type}" specified`);
  }
};

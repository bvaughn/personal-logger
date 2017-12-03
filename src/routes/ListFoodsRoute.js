// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { LOCALE_DATE_OPTIONS, LOCALE_TIME_OPTIONS, ROUTES } from '../constants';
import { DrinkIcon, FoodIcon } from '../components/FlatIcon';

import type { Food } from '../types';

type Props = {
  foods: Array<Food>,
};

// TODO Add react-virtualized

export default class ListFoods extends Component<Props> {
  render() {
    const { foods } = this.props;

    return foods.map(food => (
      <Link
        className="list-entry"
        key={food.id}
        to={ROUTES.foods.editLink(food)}
      >
        <div className="list-entry-title">
          <TypeIcon type={food.type} />
          <div className="nowrap">{food.title}</div>
        </div>
        <div className="list-entry-time">
          {food.date.toLocaleTimeString("en-US", LOCALE_TIME_OPTIONS)}
        </div>
        <small className="list-entry-date">
          ({food.date.toLocaleDateString("en-US", LOCALE_DATE_OPTIONS)})
        </small>
      </Link>
    ));
  }
}

const TypeIcon = ({ type }) => {
  switch (type) {
    case "drink":
      return <DrinkIcon className="list-entry-rating-icon" />;
    case "food":
      return <FoodIcon className="list-entry-rating-icon" />;
    default:
      throw Error(`Invalid type "${type}" specified`);
  }
}
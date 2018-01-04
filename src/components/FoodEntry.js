// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { LOCALE_DATE_OPTIONS, LOCALE_TIME_OPTIONS, ROUTES } from '../constants';
import { DrinkIcon, FoodIcon } from '../components/SvgIcons';

import type { Food } from '../types';

type Props = {
  food: Food,
  style: Object,
};

const FoodEntry = ({ food, style }: Props) => (
  <Link
    className="list-entry"
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

export default FoodEntry;

const TypeIcon = ({ type }) => {
  switch (type) {
    case 'drink':
      return <DrinkIcon className="flex-icon-left" />;
    case 'food':
      return <FoodIcon className="flex-icon-left" />;
    default:
      throw Error(`Invalid type "${type}" specified`);
  }
};

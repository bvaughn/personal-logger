// @flow

import React from 'react';
import { LOCALE_DATE_OPTIONS, LOCALE_TIME_OPTIONS, ROUTES } from '../constants';
import { DrinkIcon, FoodIcon } from '../components/SvgIcons';
import {
  ListEntry,
  ListEntryTitle,
  ListEntryTime,
  ListEntryDate,
} from '../components/ListEntry';

import type { Food } from '../types';

type Props = {
  food: Food,
  style: Object,
};

const FoodEntry = ({ food, style }: Props) => (
  <ListEntry id={food.id} style={style} to={ROUTES.foods.editLink(food)}>
    <ListEntryTitle>
      <TypeIcon type={food.type} />
      <div className="nowrap">{food.title}</div>
    </ListEntryTitle>
    <ListEntryTime>
      {food.date.toLocaleTimeString('en-US', LOCALE_TIME_OPTIONS)}
    </ListEntryTime>
    <ListEntryDate>
      ({food.date.toLocaleDateString('en-US', LOCALE_DATE_OPTIONS)})
    </ListEntryDate>
  </ListEntry>
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

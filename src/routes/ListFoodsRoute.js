// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import List from 'react-virtualized/dist/es/List';
import { ROUTES } from '../constants';
import FoodEntry from '../components/FoodEntry';
import CreateLinkIcon from '../components/CreateLinkIcon';
import LoadingSpinner from '../components/LoadingSpinner';

import type { Food, RowRendererParams } from '../types';

type Props = {
  foods: Array<Food> | null,
};

export default class ListFoods extends Component<Props> {
  render() {
    const { foods } = this.props;

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

        <Link key="Link" to={ROUTES.foods.new}>
          <CreateLinkIcon />
        </Link>,
      ];
    }
  }

  _rowRenderer = ({ key, index, style }: RowRendererParams) => {
    // $FlowFixMe We know this is not null in this case
    const food = this.props.foods[index];

    return <FoodEntry food={food} key={key} style={style} />;
  };
}

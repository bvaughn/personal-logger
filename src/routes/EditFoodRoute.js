// @flow

import React, { Component } from 'react';
import EditFoodForm from '../components/EditFoodForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROUTES } from '../constants';

import type { Food } from '../types';

type Props = {
  deleteFn: (id: string) => Promise<void>,
  id: string,
  saveFn: (food: Food) => Promise<void>,
  foods: Array<Food>,
};

export default class EditFood extends Component<Props> {
  render() {
    const food = this._getFood();

    if (food) {
      return (
        <EditFoodForm deleteFn={this._delete} saveFn={this._save} food={food} />
      );
    } else {
      return <LoadingSpinner />;
    }
  }

  _getFood = (): ?Food =>
    this.props.foods.find(food => food.id === this.props.id);

  _delete = async () => {
    await this.props.deleteFn(this.props.id);

    window.location.replace(ROUTES.foods.list);
  };

  _save = (data: Food) =>
    this.props.saveFn({
      ...data,
      id: this.props.id,
    });
}

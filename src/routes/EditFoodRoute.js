// @flow

import React, { Component } from 'react';
import EditFoodForm from '../components/EditFoodForm';
import LoadingError from '../components/LoadingError';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROUTES } from '../constants';

import type { Food } from '../types';

type Props = {
  deleteFn: (id: string) => Promise<void>,
  getRecord: (id: string) => Promise<Food>,
  id: string,
  saveFn: (food: Food) => Promise<void>,
};

type State = {
  error: Error | null,
  food: Food | null,
};

export default class EditFood extends Component<Props, State> {
  state: State = {
    error: null,
    food: null,
  };

  componentDidMount() {
    this._load();
  }

  render() {
    const { error, food } = this.state;

    if (error !== null) {
      return <LoadingError />;
    } else if (food !== null) {
      return (
        <EditFoodForm deleteFn={this._delete} saveFn={this._save} food={food} />
      );
    } else {
      return <LoadingSpinner />;
    }
  }

  _delete = async () => {
    await this.props.deleteFn(this.props.id);

    window.location.replace(ROUTES.foods.list);
  };

  async _load() {
    try {
      const food = await this.props.getRecord(this.props.id);
      this.setState({ food });
    } catch (error) {
      this.setState({ error });
    }
  }

  _save = (data: Food) =>
    this.props.saveFn({
      ...data,
      id: this.props.id,
    });
}

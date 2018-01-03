// @flow

import React, { Component } from 'react';
import EditFoodForm from '../components/EditFoodForm';
import LoadingSpinner from '../components/LoadingSpinner';
import LoadingError from '../components/LoadingError';
import { ROUTES } from '../constants';

import type { Food, History } from '../types';

type Props = {
  deleteFn: (id: string) => Promise<void>,
  getRecord: (id: string) => Promise<Food>,
  history: History,
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
    const { history } = this.props;
    const { error, food } = this.state;

    if (error !== null) {
      return <LoadingError />;
    } else if (food !== null) {
      return (
        <EditFoodForm
          deleteFn={this._delete}
          history={history}
          food={food}
          saveFn={this._save}
        />
      );
    } else {
      return <LoadingSpinner />;
    }
  }

  _delete = async () => {
    await this.props.deleteFn(this.props.id);

    this.props.history.push(ROUTES.foods.list);
  };

  async _load() {
    try {
      const food = await this.props.getRecord(this.props.id);

      // JIT Migrate older foods that didn't have attributes
      food.attributes = food.attributes || {};

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

// @flow

import React, { Component } from 'react';
import EditExerciseForm from '../components/EditExerciseForm';
import LoadingError from '../components/LoadingError';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROUTES } from '../constants';

import type { Exercise } from '../types';

type Props = {
  deleteFn: (id: string) => Promise<void>,
  getRecord: (id: string) => Promise<Exercise>,
  id: string,
  saveFn: (exercise: Exercise) => Promise<void>,
};

type State = {
  error: Error | null,
  exercise: Exercise | null,
};

export default class EditExercise extends Component<Props, State> {
  state: State = {
    error: null,
    exercise: null,
  };

  componentDidMount() {
    this._load();
  }

  render() {
    const { error, exercise } = this.state;

    if (error !== null) {
      return <LoadingError />;
    } else if (exercise !== null) {
      return (
        <EditExerciseForm
          deleteFn={this._delete}
          saveFn={this._save}
          exercise={exercise}
        />
      );
    } else {
      return <LoadingSpinner />;
    }
  }

  _delete = async () => {
    await this.props.deleteFn(this.props.id);

    window.location.replace(ROUTES.exercise.list);
  };

  async _load() {
    try {
      const exercise = await this.props.getRecord(this.props.id);
      this.setState({ exercise });
    } catch (error) {
      this.setState({ error });
    }
  }

  _save = (data: Exercise) =>
    this.props.saveFn({
      ...data,
      id: this.props.id,
    });
}

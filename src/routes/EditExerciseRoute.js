// @flow

import React, { Component } from 'react';
import EditExerciseForm from '../components/EditExerciseForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROUTES } from '../constants';

import type { Exercise } from '../types';

type Props = {
  deleteFn: (id: string) => Promise<void>,
  id: string,
  saveFn: (exercise: Exercise) => Promise<void>,
  exercise: Array<Exercise>,
};

export default class EditExercise extends Component<Props> {
  render() {
    const exercise = this._getExercise();

    if (exercise) {
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

  _getExercise = (): ?Exercise =>
    this.props.exercise.find(exercise => exercise.id === this.props.id);

  _delete = async () => {
    await this.props.deleteFn(this.props.id);

    window.location.replace(ROUTES.exercise.list);
  };

  _save = (data: Exercise) =>
    this.props.saveFn({
      ...data,
      id: this.props.id,
    });
}

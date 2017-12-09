// @flow

import React, { Component } from 'react';
import EditSymptomForm from '../components/EditSymptomForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROUTES } from '../constants';

import type { Symptom } from '../types';

type Props = {
  deleteFn: (id: string) => Promise<void>,
  id: string,
  saveFn: (symptom: Symptom) => Promise<void>,
  symptoms: Array<Symptom>,
};

export default class EditSymptom extends Component<Props> {
  render() {
    const symptom = this._getSymptom();

    if (symptom) {
      return (
        <EditSymptomForm
          deleteFn={this._delete}
          saveFn={this._save}
          symptom={symptom}
        />
      );
    } else {
      return <LoadingSpinner />;
    }
  }

  _getSymptom = (): ?Symptom =>
    this.props.symptoms.find(symptom => symptom.id === this.props.id);

  _delete = async () => {
    await this.props.deleteFn(this.props.id);

    window.location.replace(ROUTES.symptoms.list);
  };

  _save = (data: Symptom) =>
    this.props.saveFn({
      ...data,
      id: this.props.id,
    });
}

// @flow

import React, { Component } from 'react';
import EditSymptomForm from '../components/EditSymptomForm';
import LoadingError from '../components/LoadingError';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROUTES } from '../constants';

import type { History, Symptom } from '../types';

type Props = {
  deleteFn: (id: string) => Promise<void>,
  getRecord: (id: string) => Promise<Symptom>,
  history: History,
  id: string,
  saveFn: (symptom: Symptom) => Promise<void>,
};

type State = {
  error: Error | null,
  symptom: Symptom | null,
};

export default class EditSymptom extends Component<Props, State> {
  state: State = {
    error: null,
    symptom: null,
  };

  componentDidMount() {
    this._load();
  }

  render() {
    const { history } = this.props;
    const { error, symptom } = this.state;

    if (error !== null) {
      return <LoadingError />;
    } else if (symptom !== null) {
      return (
        <EditSymptomForm
          deleteFn={this._delete}
          history={history}
          saveFn={this._save}
          symptom={symptom}
        />
      );
    } else {
      return <LoadingSpinner />;
    }
  }

  _delete = async () => {
    await this.props.deleteFn(this.props.id);

    this.props.history.push(ROUTES.symptoms.list);
  };

  async _load() {
    try {
      const symptom = await this.props.getRecord(this.props.id);
      this.setState({ symptom });
    } catch (error) {
      this.setState({ error });
    }
  }

  _save = (data: Symptom) =>
    this.props.saveFn({
      ...data,
      id: this.props.id,
    });
}

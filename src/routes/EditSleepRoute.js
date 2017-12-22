// @flow

import React, { Component } from 'react';
import EditSleepForm from '../components/EditSleepForm';
import LoadingError from '../components/LoadingError';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROUTES } from '../constants';

import type { History, Sleep } from '../types';

type Props = {
  deleteFn: (id: string) => Promise<void>,
  getRecord: (id: string) => Promise<Sleep>,
  history: History,
  id: string,
  saveFn: (sleep: Sleep) => Promise<void>,
};

type State = {
  error: Error | null,
  sleep: Sleep | null,
};

export default class EditSleep extends Component<Props, State> {
  state: State = {
    error: null,
    sleep: null,
  };

  componentDidMount() {
    this._load();
  }

  render() {
    const { history } = this.props;
    const { error, sleep } = this.state;

    if (error !== null) {
      return <LoadingError />;
    } else if (sleep !== null) {
      return (
        <EditSleepForm
          deleteFn={this._delete}
          history={history}
          saveFn={this._save}
          sleep={sleep}
        />
      );
    } else {
      return <LoadingSpinner />;
    }
  }

  _delete = async () => {
    await this.props.deleteFn(this.props.id);

    this.props.history.push(ROUTES.sleep.list);
  };

  async _load() {
    try {
      const sleep = await this.props.getRecord(this.props.id);
      this.setState({ sleep });
    } catch (error) {
      this.setState({ error });
    }
  }

  _save = (data: Sleep) =>
    this.props.saveFn({
      ...data,
      id: this.props.id,
    });
}

// @flow

import React, { Component } from 'react';
import EditSleepForm from '../components/EditSleepForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROUTES } from '../constants';

import type { Sleep } from '../types';

type Props = {
  deleteFn: (id: string) => Promise<void>,
  id: string,
  saveFn: (sleep: Sleep) => Promise<void>,
  sleep: Array<Sleep>,
};

export default class EditSleep extends Component<Props> {
  render() {
    const sleep = this._getSleep();

    if (sleep) {
      return (
        <EditSleepForm
          deleteFn={this._delete}
          saveFn={this._save}
          sleep={sleep}
        />
      );
    } else {
      return <LoadingSpinner />;
    }
  }

  _getSleep = (): ?Sleep =>
    this.props.sleep.find(sleep => sleep.id === this.props.id);

  _delete = async () => {
    await this.props.deleteFn(this.props.id);

    window.location.replace(ROUTES.sleep.list);
  };

  _save = (data: Sleep) =>
    this.props.saveFn({
      ...data,
      id: this.props.id,
    });
}

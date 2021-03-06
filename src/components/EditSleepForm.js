// @flow

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { DateIcon } from './SvgIcons';
import FormSectionHeader from './form/FormSectionHeader';
import FormButton from './form/FormButton';
import RatingRadioOption from './form/RatingRadioOption';
import { getDate, getDateString } from '../utils';
import { css } from 'glamor';

import type { History, Sleep } from '../types';

type Props = {
  deleteFn?: () => Promise<void>,
  history: History,
  saveFn: (sleep: Sleep) => Promise<void>,
  sleep: Sleep,
};

type State = {
  date: string,
  hasConfirmed: boolean,
  isSaving: boolean,
  sleep: Sleep,
};

export default class EditSleepForm extends Component<Props, State> {
  state: State = {
    date: getDateString(this.props.sleep.date),
    sleep: { ...this.props.sleep }, // Shallow clone for editing
    hasConfirmed: false,
    isSaving: false,
  };

  render() {
    const { deleteFn } = this.props;
    const { date, hasConfirmed, isSaving, sleep } = this.state;

    return (
      <form
        className="new-form"
        disabled={isSaving}
        onSubmit={this._onSubmit}
        autoCapitalize="none"
      >
        <section className="new-form-section">
          <FormSectionHeader>
            <DateIcon className="new-form-section-header-svg" />
            <input
              className="new-form-date-time-input"
              disabled={isSaving}
              onChange={this._onDateChange}
              type="date"
              value={date}
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <div {...css({ margin: '1rem 0' })}>Quality of Sleep</div>
          <FormSectionHeader>
            <RatingRadioOption
              isDisabled={isSaving}
              onChange={this._onRatingChange}
              rating={sleep.rating}
              value={0}
            />
            <RatingRadioOption
              isDisabled={isSaving}
              onChange={this._onRatingChange}
              rating={sleep.rating}
              value={1}
            />
            <RatingRadioOption
              isDisabled={isSaving}
              onChange={this._onRatingChange}
              rating={sleep.rating}
              value={2}
            />
            <RatingRadioOption
              isDisabled={isSaving}
              onChange={this._onRatingChange}
              rating={sleep.rating}
              value={3}
            />
            <RatingRadioOption
              isDisabled={isSaving}
              onChange={this._onRatingChange}
              rating={sleep.rating}
              value={4}
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <FormSectionHeader>
            Duration&nbsp;<small>(hours)</small>
            <input
              className="new-form-input"
              disabled={isSaving}
              min="0"
              name="duration"
              onChange={this._onDurationChange}
              step="0.25"
              type="number"
              value={sleep.duration || ''}
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <FormSectionHeader>
            Awakened<small />
            <input
              className="new-form-input"
              disabled={isSaving}
              name="awakenings"
              onChange={this._onAwakeningsChange}
              type="number"
              value={sleep.awakenings || ''}
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <FormSectionHeader>
            <textarea
              className="new-form-textarea"
              disabled={isSaving}
              onChange={this._onNotesChange}
              placeholder="Notes (optional)"
              value={sleep.notes}
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <FormButton disabled={isSaving} type="save">
            Save
          </FormButton>
        </section>
        {!!deleteFn && (
          <section className="new-form-section">
            <FormButton
              disabled={isSaving}
              onClick={this._onDelete}
              type="delete"
            >
              {hasConfirmed ? 'Are you sure?' : 'Delete'}
            </FormButton>
          </section>
        )}
        <section className="new-form-section">
          <NavLink to={ROUTES.sleep.list}>
            <FormButton disabled={isSaving} type="cancel">
              Cancel
            </FormButton>
          </NavLink>
        </section>
      </form>
    );
  }

  _onAwakeningsChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const awakenings = parseInt(event.currentTarget.value, 10) || 0;
    this.setState(state => ({
      sleep: {
        ...state.sleep,
        awakenings,
      },
    }));
  };

  _onDateChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      date: event.currentTarget.value,
    });
  };

  _onDelete = (event: Event) => {
    event.preventDefault();

    if (!this.state.hasConfirmed) {
      this.setState({
        hasConfirmed: true,
      });
    } else {
      this.setState(
        {
          isSaving: true,
        },
        this.props.deleteFn
      );
    }
  };

  _onDurationChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const duration = parseFloat(event.currentTarget.value) || 0;
    this.setState(state => ({
      sleep: {
        ...state.sleep,
        duration,
      },
    }));
  };

  _onNotesChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const notes = event.currentTarget.value;
    this.setState(state => ({
      sleep: {
        ...state.sleep,
        notes,
      },
    }));
  };

  _onRatingChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const rating = parseInt(event.currentTarget.value, 10) || 0;
    this.setState(state => ({
      sleep: {
        ...state.sleep,
        rating,
      },
    }));
  };

  _onSubmit = (event: Event) => {
    event.preventDefault();

    const { history, saveFn } = this.props;
    const { date, sleep } = this.state;

    sleep.date = getDate(date);

    this.setState(
      {
        isSaving: true,
      },
      async () => {
        await saveFn(sleep);

        history.push(ROUTES.sleep.list);
      }
    );
  };
}

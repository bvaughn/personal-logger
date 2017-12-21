// @flow

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { DateIcon } from '../components/SvgIcons';
import RatingIcon from '../components/RatingIcon';
import { getDate, getDateString } from '../utils';

import type { Sleep } from '../types';

type Props = {
  deleteFn?: () => Promise<void>,
  saveFn: (sleep: Sleep) => Promise<void>,
  sleep: Sleep,
};

type State = {
  date: string,
  isSaving: boolean,
  sleep: Sleep,
};

export default class EditSleepForm extends Component<Props, State> {
  state: State = {
    date: getDateString(this.props.sleep.date),
    sleep: { ...this.props.sleep }, // Shallow clone for editing
    isSaving: false,
  };

  render() {
    const { deleteFn } = this.props;
    const { date, isSaving, sleep } = this.state;
    console.log('render sleep:', sleep);

    return (
      <form className="new-form" disabled={isSaving} onSubmit={this._onSubmit}>
        <section className="new-form-section">
          <div className="new-form-section-header">
            <DateIcon className="new-form-section-header-svg" />
            <input
              className="new-form-date-time-input"
              disabled={isSaving}
              onChange={this._onDateChange}
              type="date"
              value={date}
            />
          </div>
        </section>
        <section className="new-form-section">Quality of Sleep</section>
        <section className="new-form-section">
          <div className="new-form-section-header">
            <RatingRadioOption
              isSaving={isSaving}
              onChange={this._onRatingChange}
              rating={sleep.rating}
              value={0}
            />
            <RatingRadioOption
              isSaving={isSaving}
              onChange={this._onRatingChange}
              rating={sleep.rating}
              value={1}
            />
            <RatingRadioOption
              isSaving={isSaving}
              onChange={this._onRatingChange}
              rating={sleep.rating}
              value={2}
            />
            <RatingRadioOption
              isSaving={isSaving}
              onChange={this._onRatingChange}
              rating={sleep.rating}
              value={3}
            />
            <RatingRadioOption
              isSaving={isSaving}
              onChange={this._onRatingChange}
              rating={sleep.rating}
              value={4}
            />
          </div>
        </section>
        <section className="new-form-section">
          <div className="new-form-section-header">
            Duration&nbsp;<small>(hours)</small>
            <input
              className="new-form-input"
              disabled={isSaving}
              name="duration"
              onChange={this._onDurationChange}
              type="number"
              value={sleep.duration || ''}
            />
          </div>
        </section>
        <section className="new-form-section">
          <div className="new-form-section-header">
            Awakened<small />
            <input
              className="new-form-input"
              disabled={isSaving}
              name="awakenings"
              onChange={this._onAwakeningsChange}
              type="number"
              value={sleep.awakenings || ''}
            />
          </div>
        </section>
        <section className="new-form-section">
          <textarea
            className="new-form-textarea"
            disabled={isSaving}
            onChange={this._onNotesChange}
            placeholder="Notes (optional)"
            value={sleep.notes}
          />
        </section>
        <section className="new-form-section">
          <button className="new-form-save-button" disabled={isSaving}>
            Save
          </button>
        </section>
        {!!deleteFn && (
          <section className="new-form-section">
            <button
              className="new-form-delete-button"
              disabled={isSaving}
              onClick={this._onDelete}
            >
              Delete
            </button>
          </section>
        )}
        <section className="new-form-section">
          <NavLink to={ROUTES.sleep.list}>
            <button className="new-form-cancel-button" disabled={isSaving}>
              Cancel
            </button>
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

    this.setState(
      {
        isSaving: true,
      },
      this.props.deleteFn
    );
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

    const { saveFn } = this.props;
    const { date, sleep } = this.state;

    sleep.date = getDate(date);

    this.setState(
      {
        isSaving: true,
      },
      async () => {
        await saveFn(sleep);

        window.location.replace(ROUTES.sleep.list);
      }
    );
  };
}

const RatingRadioOption = ({ isSaving, onChange, rating, value }) => (
  <label className="new-form-rating-radio-label">
    <RatingIcon
      className={`new-form-rating-svg ${
        rating === value ? 'new-form-rating-svg-active' : ''
      }`}
      rating={value}
    />
    <input
      checked={rating === value}
      disabled={isSaving}
      name="rating"
      onChange={onChange}
      type="radio"
      value={value}
    />
  </label>
);

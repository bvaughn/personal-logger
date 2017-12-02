// @flow

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { BadFaceIcon, BestFaceIcon, DateIcon, EnergyIcon, GoodFaceIcon, NeutralFaceIcon, StomachIcon, TimeIcon, WorstFaceIcon } from '../components/FlatIcon';
import { getDate, getDateString, getTimeString } from '../utils';

import type { Symptom } from '../types';

type Props = {
  deleteFn?: () => Promise<void>,
  saveFn: (Symptom: Symptom) => Promise<void>,
  symptom: Symptom,
};

type State = {
  date: string,
  isSaving: boolean,
  symptom: Symptom,
  time: string,
};

export default class NewSymptom extends Component<Props, State> {
  state: State = {
    date: getDateString(this.props.symptom.date),
    symptom: {...this.props.symptom}, // Shallow clone for editing
    isSaving: false,
    time: getTimeString(this.props.symptom.date),
  };

  render() {
    const {deleteFn} = this.props;
    const {date, isSaving, symptom, time} = this.state;

    return (
      <form
        className="new-form"
        disabled={isSaving}
        onSubmit={this._onSubmit}
      >
        <section className="new-form-section">
          <div className="new-form-section-header">
            <DateIcon className="new-form-section-header-svg" />
            <input
              disabled={isSaving}
              onChange={this._onDateChange}
              type="date"
              value={date}
            />
            <TimeIcon className="new-form-section-header-svg" />
            <input
              disabled={isSaving}
              onChange={this._onTimeChange}
              type="time"
              value={time}
            />
          </div>
        </section>
        <section className="new-form-section">
          <div className="new-form-section-header new-form-section-header-types">
            <label className="new-form-rating-radio-label">
              <small>Energy</small>
              <EnergyIcon
                className={`new-form-type-svg ${symptom.type === "energy" ? 'new-form-type-svg-active' : ''}`}
              />
              <input
                checked={symptom.type === "energy"}
                disabled={isSaving}
                name="type"
                onChange={this._onTypeChange}
                type="radio"
                value="energy"
              />
            </label>
            <label className="new-form-rating-radio-label">
              <small>Stomach</small>
              <StomachIcon
                className={`new-form-type-svg ${symptom.type === "stomach" ? 'new-form-type-svg-active' : ''}`}
              />
              <input
                checked={symptom.type === "stomach"}
                disabled={isSaving}
                name="type"
                onChange={this._onTypeChange}
                type="radio"
                value="stomach"
              />
            </label>
          </div>
        </section>
        <section className="new-form-section">
          <hr/>
        </section>
        <section className="new-form-section">
          <div className="new-form-section-header">
            <RatingRadioOption
              isSaving={isSaving}
              onChange={this._onRatingChange}
              Icon={WorstFaceIcon}
              rating={symptom.rating}
              value={0}
            />
            <RatingRadioOption
              isSaving={isSaving}
              onChange={this._onRatingChange}
              Icon={BadFaceIcon}
              rating={symptom.rating}
              value={1}
            />
            <RatingRadioOption
              isSaving={isSaving}
              onChange={this._onRatingChange}
              Icon={NeutralFaceIcon}
              rating={symptom.rating}
              value={2}
            />
            <RatingRadioOption
              isSaving={isSaving}
              onChange={this._onRatingChange}
              Icon={GoodFaceIcon}
              rating={symptom.rating}
              value={3}
            />
            <RatingRadioOption
              isSaving={isSaving}
              onChange={this._onRatingChange}
              Icon={BestFaceIcon}
              rating={symptom.rating}
              value={4}
            />
          </div>
        </section>
        <section className="new-form-section">
          <textarea
            className="new-form-textarea"
            disabled={isSaving}
            onChange={this._onNotesChange}
            placeholder="Notes (optional)"
            value={symptom.notes}
          />
        </section>
        <section className="new-form-section">
          <button
            className="new-form-save-button"
            disabled={isSaving}
          >
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
          <NavLink to={ROUTES.symptoms.list}>
            <button
              className="new-form-cancel-button"
              disabled={isSaving}
            >
              Cancel
            </button>
          </NavLink>
        </section>
      </form>
    );
  }

  _onDateChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      date: event.currentTarget.value,
    });
  };

  _onDelete = (event: Event) => {
    event.preventDefault();

    const {deleteFn} = this.props;
    if (deleteFn !== undefined) {
      deleteFn();
    }
  };

  _onNotesChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const notes = event.currentTarget.value;
    this.setState(state => ({
      symptom: {
        ...state.symptom,
        notes,
      },
    }));
  };

  _onRatingChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const rating = parseInt(event.currentTarget.value, 10) || 0;
    this.setState(state => ({
      symptom: {
        ...state.symptom,
        rating,
      },
    }));
  };

  _onSubmit = (event: Event) => {
    event.preventDefault();

    const {saveFn} = this.props;
    const {date, symptom, time} = this.state;

    symptom.date = getDate(date, time);

    this.setState({
      isSaving: true
    }, async () => {
      await saveFn(symptom);

      window.location.replace(ROUTES.symptoms.list);
    });
  };

  _onTimeChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      time: event.currentTarget.value,
    });
  };

  _onTypeChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const type = event.currentTarget.value;
    this.setState(state => ({
      symptom: {
        ...state.symptom,
        type,
      },
    }));
  };
}

const RatingRadioOption = ({ isSaving, Icon, onChange, rating, value }) => (
  <label className="new-form-rating-radio-label">
    <Icon
      className={`new-form-rating-svg ${rating === value ? 'new-form-rating-svg-active' : ''}`}
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
)
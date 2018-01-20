// @flow

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { DateIcon, EnergyIcon, StomachIcon, TimeIcon } from './SvgIcons';
import FormSectionHeader from './form/FormSectionHeader';
import FormButton from './form/FormButton';
import RadioOption from './form/RadioOption';
import RatingRadioOption from './form/RatingRadioOption';
import { getDate, getDateString, getTimeString } from '../utils';

import type { History, Symptom } from '../types';

type Props = {
  deleteFn?: () => Promise<void>,
  history: History,
  saveFn: (Symptom: Symptom) => Promise<void>,
  symptom: Symptom,
};

type State = {
  date: string,
  hasConfirmed: boolean,
  isSaving: boolean,
  symptom: Symptom,
  time: string,
};

export default class NewSymptom extends Component<Props, State> {
  state: State = {
    date: getDateString(this.props.symptom.date),
    symptom: { ...this.props.symptom }, // Shallow clone for editing
    hasConfirmed: false,
    isSaving: false,
    time: getTimeString(this.props.symptom.date),
  };

  render() {
    const { deleteFn } = this.props;
    const { date, hasConfirmed, isSaving, symptom, time } = this.state;

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
          <FormSectionHeader>
            <TimeIcon className="new-form-section-header-svg" />
            <input
              className="new-form-date-time-input"
              disabled={isSaving}
              onChange={this._onTimeChange}
              type="time"
              value={time}
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <FormSectionHeader>
            <RadioOption
              IconComponent={EnergyIcon}
              isChecked={symptom.type === 'energy'}
              isDisabled={isSaving}
              label="Energy"
              onChange={this._onTypeChange}
              value="energy"
            />
            <RadioOption
              IconComponent={StomachIcon}
              isChecked={symptom.type === 'stomach'}
              isDisabled={isSaving}
              label="Stomach"
              onChange={this._onTypeChange}
              value="stomach"
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <hr />
        </section>
        <section className="new-form-section">
          <FormSectionHeader>
            <RatingRadioOption
              isDisabled={isSaving}
              onChange={this._onRatingChange}
              rating={symptom.rating}
              value={0}
            />
            <RatingRadioOption
              isDisabled={isSaving}
              onChange={this._onRatingChange}
              rating={symptom.rating}
              value={1}
            />
            <RatingRadioOption
              isDisabled={isSaving}
              onChange={this._onRatingChange}
              rating={symptom.rating}
              value={2}
            />
            <RatingRadioOption
              isDisabled={isSaving}
              onChange={this._onRatingChange}
              rating={symptom.rating}
              value={3}
            />
            <RatingRadioOption
              isDisabled={isSaving}
              onChange={this._onRatingChange}
              rating={symptom.rating}
              value={4}
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
              value={symptom.notes}
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
          <NavLink to={ROUTES.symptoms.list}>
            <FormButton disabled={isSaving} type="cancel">
              Cancel
            </FormButton>
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

    const { history, saveFn } = this.props;
    const { date, symptom, time } = this.state;

    symptom.date = getDate(date, time);

    this.setState(
      {
        isSaving: true,
      },
      async () => {
        await saveFn(symptom);

        history.push(ROUTES.symptoms.list);
      }
    );
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

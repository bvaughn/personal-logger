// @flow

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { DateIcon, HeartIcon, StrengthIcon, TimeIcon } from './SvgIcons';
import { getDate, getDateString, getTimeString } from '../utils';
import {
  IntensityLowIcon,
  IntensityMediumIcon,
  IntensityHighIcon,
} from './IntensityIcon';
import FormSectionHeader from './form/FormSectionHeader';
import FormButton from './form/FormButton';
import RadioOption from './form/RadioOption';
import { css } from 'glamor';

import type { Exercise, History } from '../types';

type Props = {
  deleteFn?: () => Promise<void>,
  exercise: Exercise,
  history: History,
  saveFn: (exercise: Exercise) => Promise<void>,
};

type State = {
  date: string,
  hasConfirmed: boolean,
  isSaving: boolean,
  exercise: Exercise,
  time: string,
};

export default class EditExerciseForm extends Component<Props, State> {
  state: State = {
    date: getDateString(this.props.exercise.date),
    exercise: { ...this.props.exercise }, // Shallow clone for editing
    hasConfirmed: false,
    isSaving: false,
    time: getTimeString(this.props.exercise.date),
  };

  render() {
    const { deleteFn } = this.props;
    const { date, hasConfirmed, isSaving, exercise, time } = this.state;

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
              name="date"
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
              name="time"
              onChange={this._onTimeChange}
              type="time"
              value={time}
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <FormSectionHeader>
            <RadioOption
              IconComponent={HeartIcon}
              isChecked={exercise.type === 'cardio'}
              isDisabled={isSaving}
              label="Cardio"
              onChange={this._onTypeChange}
              value="cardio"
            />
            <RadioOption
              IconComponent={StrengthIcon}
              isChecked={exercise.type === 'strength'}
              isDisabled={isSaving}
              label="Strength"
              onChange={this._onTypeChange}
              value="strength"
            />
          </FormSectionHeader>
        </section>
        {exercise.type === 'cardio' && (
          <section className="new-form-section">
            <FormSectionHeader>
              Distance&nbsp;<small>(miles)</small>
              <input
                className="new-form-input"
                disabled={isSaving}
                min="0"
                name="duration"
                onChange={this._onDistanceChange}
                step="0.25"
                type="number"
                value={exercise.distance || ''}
              />
            </FormSectionHeader>
          </section>
        )}
        <section className="new-form-section">
          <FormSectionHeader>
            Duration&nbsp;<small>(minutes)</small>
            <input
              className="new-form-input"
              disabled={isSaving}
              min="0"
              name="duration"
              onChange={this._onDurationChange}
              step="0.25"
              type="number"
              value={exercise.duration || ''}
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">Intensity</section>
        <section className="new-form-section">
          <FormSectionHeader>
            <IntensityRadioOption
              intensity={exercise.intensity}
              isSaving={isSaving}
              onChange={this._onIntensityChange}
              value={1}
            />
            <IntensityRadioOption
              intensity={exercise.intensity}
              isSaving={isSaving}
              onChange={this._onIntensityChange}
              value={2}
            />
            <IntensityRadioOption
              intensity={exercise.intensity}
              isSaving={isSaving}
              onChange={this._onIntensityChange}
              value={3}
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <FormButton type="save">Save</FormButton>
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
          <NavLink to={ROUTES.exercise.list}>
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

  _onDistanceChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const distance = parseFloat(event.currentTarget.value) || 0;
    this.setState(state => ({
      exercise: {
        ...state.exercise,
        distance,
      },
    }));
  };

  _onDurationChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const duration = parseFloat(event.currentTarget.value) || 0;
    this.setState(state => ({
      exercise: {
        ...state.exercise,
        duration,
      },
    }));
  };

  _onIntensityChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const intensity = parseInt(event.currentTarget.value, 10) || 1;
    this.setState(state => ({
      exercise: {
        ...state.exercise,
        intensity,
      },
    }));
  };

  _onNotesChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const notes = event.currentTarget.value;
    this.setState(state => ({
      exercise: {
        ...state.exercise,
        notes,
      },
    }));
  };

  _onSubmit = (event: Event) => {
    event.preventDefault();

    const { history, saveFn } = this.props;
    const { date, exercise, time } = this.state;

    exercise.date = getDate(date, time);

    this.setState(
      {
        isSaving: true,
      },
      async () => {
        await saveFn(exercise);

        history.push(ROUTES.exercise.list);
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
      exercise: {
        ...state.exercise,
        type,
      },
    }));
  };
}

const IntensityRadioOption = ({ isSaving, intensity, onChange, value }) => {
  let IconComponent;
  switch (value) {
    case 1:
      IconComponent = IntensityLowIcon;
      break;
    case 2:
      IconComponent = IntensityMediumIcon;
      break;
    case 3:
      IconComponent = IntensityHighIcon;
      break;
    default:
      throw Error(`Invalid intensity "${intensity}" specified.`);
  }

  return (
    <RadioOption
      IconComponent={IconComponent}
      isChecked={intensity === value}
      isDisabled={isSaving}
      name="intensity"
      onChange={onChange}
      value={value}
    />
  );
};

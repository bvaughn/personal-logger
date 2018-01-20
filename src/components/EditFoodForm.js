// @flow

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { css } from 'glamor';
import { ROUTES } from '../constants';
import {
  DateIcon,
  DrinkIcon,
  FoodIcon,
  TimeIcon,
} from '../components/SvgIcons';
import { getDate, getDateString, getTimeString } from '../utils';
import FormSectionHeader from './form/FormSectionHeader';
import FormButton from './form/FormButton';
import RadioOption from './form/RadioOption';

import type { Food, History } from '../types';

type Props = {
  deleteFn?: () => Promise<void>,
  history: History,
  saveFn: (Food: Food) => Promise<void>,
  food: Food,
};

type State = {
  date: string,
  hasConfirmed: boolean,
  isSaving: boolean,
  food: Food,
  time: string,
};

export default class NewFoodDrink extends Component<Props, State> {
  state: State = {
    date: getDateString(this.props.food.date),
    food: { ...this.props.food }, // Shallow clone for editing
    hasConfirmed: false,
    isSaving: false,
    time: getTimeString(this.props.food.date),
  };

  render() {
    const { deleteFn } = this.props;
    const { date, food, hasConfirmed, isSaving, time } = this.state;

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
              IconComponent={FoodIcon}
              isChecked={food.type === 'food'}
              isDisabled={isSaving}
              label="Food"
              onChange={this._onTypeChange}
              value="food"
            />
            <RadioOption
              IconComponent={DrinkIcon}
              isChecked={food.type === 'drink'}
              isDisabled={isSaving}
              label="Drink"
              onChange={this._onTypeChange}
              value="drink"
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <FormSectionHeader>
            <input
              className="new-form-input"
              disabled={isSaving}
              name="title"
              onChange={this._onTitleChange}
              placeholder="What did you eat/drink?"
              type="text"
              value={food.title}
            />
          </FormSectionHeader>
        </section>
        {food.type === 'food' ? (
          <section className="new-form-section">
            <FormSectionHeader>
              <label>Meal Size:</label>
              <label className="new-form-rating-radio-label">
                <small>Snack</small>
                <input
                  checked={food.size === 'snack'}
                  disabled={isSaving}
                  name="size"
                  onChange={this._onSizeChange}
                  type="radio"
                  value="snack"
                />
              </label>
              <label className="new-form-rating-radio-label">
                <small>Small</small>
                <input
                  checked={food.size === 'small'}
                  disabled={isSaving}
                  name="size"
                  onChange={this._onSizeChange}
                  type="radio"
                  value="small"
                />
              </label>
              <label className="new-form-rating-radio-label">
                <small>Large</small>
                <input
                  checked={food.size === 'large'}
                  disabled={isSaving}
                  name="size"
                  onChange={this._onSizeChange}
                  type="radio"
                  value="large"
                />
              </label>
            </FormSectionHeader>
          </section>
        ) : (
          ''
        )}
        <section className="new-form-section">
          <FormSectionHeader>
            <label className="new-form-radio-label">
              <input
                checked={food.attributes.spicy}
                className="new-form-checkbox"
                disabled={isSaving}
                name="title"
                onChange={this._onSpicyChange}
                type="checkbox"
              />
              Spicy?
            </label>
            <label className="new-form-radio-label">
              <input
                checked={food.attributes.raw}
                className="new-form-checkbox"
                disabled={isSaving}
                name="title"
                onChange={this._onRawChange}
                type="checkbox"
              />
              Raw?
            </label>
            <label className="new-form-radio-label">
              <input
                checked={food.attributes.alcoholic}
                className="new-form-checkbox"
                disabled={isSaving}
                name="title"
                onChange={this._onAlcoholicChange}
                type="checkbox"
              />
              Alcoholic?
            </label>
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <FormSectionHeader>
            <label>Ingredients:</label>
            <input
              className="new-form-add-ingredient-button"
              disabled={isSaving}
              onClick={this._addIngredient}
              type="button"
              value="+ add"
              {...css({
                background: '#ddd',
                color: '#333',
                appearance: 'none',
                border: 'none',
                padding: '0.25rem 0.5rem',
              })}
            />
          </FormSectionHeader>
          {food.ingredients.map((ingredient, index) => (
            <input
              className="new-form-input"
              disabled={isSaving}
              key={index}
              onChange={event =>
                this._onIngredientChange(index, event.currentTarget.value)
              }
              type="text"
              value={ingredient}
            />
          ))}
        </section>
        <section className="new-form-section">
          <FormSectionHeader>
            <textarea
              className="new-form-textarea"
              disabled={isSaving}
              onChange={this._onNotesChange}
              placeholder="Notes (optional)"
              value={food.notes}
            />
          </FormSectionHeader>
        </section>
        <section className="new-form-section">
          <FormButton disabled={isSaving || !food.title} type="save">
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
          <NavLink to={ROUTES.foods.list}>
            <FormButton disabled={isSaving} type="cancel">
              Cancel
            </FormButton>
          </NavLink>
        </section>
      </form>
    );
  }

  _addIngredient = () => {
    this.setState(state => ({
      food: {
        ...state.food,
        ingredients: [...state.food.ingredients, ''],
      },
    }));
  };

  _onAlcoholicChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const alcoholic = event.currentTarget.checked;
    this.setState(state => {
      const attributes = { ...state.food.attributes };
      attributes.alcoholic = alcoholic;

      return {
        food: {
          ...state.food,
          attributes,
        },
      };
    });
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

  _onIngredientChange = (index: number, value: string) => {
    this.setState(state => {
      const ingredients = [...state.food.ingredients];
      ingredients[index] = value;

      return {
        food: {
          ...state.food,
          ingredients,
        },
      };
    });
  };

  _onNotesChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const notes = event.currentTarget.value;
    this.setState(state => ({
      food: {
        ...state.food,
        notes,
      },
    }));
  };

  _onRawChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const raw = event.currentTarget.checked;
    this.setState(state => {
      const attributes = { ...state.food.attributes };
      attributes.raw = raw;

      return {
        food: {
          ...state.food,
          attributes,
        },
      };
    });
  };

  _onSpicyChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const spicy = event.currentTarget.checked;
    this.setState(state => {
      const attributes = { ...state.food.attributes };
      attributes.spicy = spicy;

      return {
        food: {
          ...state.food,
          attributes,
        },
      };
    });
  };

  _onSizeChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const size = event.currentTarget.value;
    this.setState(state => {
      return {
        food: {
          ...state.food,
          size,
        },
      };
    });
  };

  _onSubmit = (event: Event) => {
    event.preventDefault();

    const { history, saveFn } = this.props;
    const { date, food, time } = this.state;

    food.date = getDate(date, time);
    food.ingredients = food.ingredients.filter(Boolean);

    this.setState(
      {
        isSaving: true,
      },
      async () => {
        await saveFn(food);

        history.push(ROUTES.foods.list);
      }
    );
  };

  _onTimeChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      time: event.currentTarget.value,
    });
  };

  _onTitleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const title = event.currentTarget.value;
    this.setState(state => ({
      food: {
        ...state.food,
        title,
      },
    }));
  };

  _onTypeChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const type = event.currentTarget.value;
    this.setState(state => ({
      food: {
        ...state.food,
        type,
      },
    }));
  };
}

/* @flow */

import React from 'react';
import RatingIcon from '../RatingIcon';
import { css } from 'glamor';

type Props = {
  isDisabled: boolean,
  onChange: Function,
  rating: number,
  value: number,
};

export default function RadioOption({
  isDisabled,
  onChange,
  rating,
  value,
}: Props) {
  return (
    <label
      {...css({
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      })}
    >
      <RatingIcon
        className={`new-form-rating-svg ${
          rating === value ? 'new-form-rating-svg-active' : ''
        }`}
        rating={value}
      />
      <input
        checked={rating === value}
        disabled={isDisabled}
        name="rating"
        onChange={onChange}
        type="radio"
        value={value}
      />
    </label>
  );
}

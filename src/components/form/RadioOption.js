/* @flow */

import React from 'react';
import { css } from 'glamor';

type Props = {
  IconComponent: Function,
  isChecked: boolean,
  isDisabled: boolean,
  label: string,
  name?: string,
  onChange: Function,
  value: string,
};

export default function RadioOption({
  IconComponent,
  isChecked,
  isDisabled,
  label,
  name = 'type',
  onChange,
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
      <small>{label}</small>
      <IconComponent
        {...css({
          width: '3rem',
          height: '3rem',
          margin: '0.5rem 0',
          transition: 'filter 500ms ease-in-out',
          filter: isChecked ? undefined : 'grayscale(100%)',
        })}
      />
      <input
        checked={isChecked}
        disabled={isDisabled}
        name={name}
        onChange={onChange}
        type="radio"
        value={value}
      />
    </label>
  );
}

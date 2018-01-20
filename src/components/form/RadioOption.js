/* @flow */

import React from 'react';
import { css } from 'glamor';

type Props = {
  IconComponent: Function,
  isChecked: boolean,
  isDisabled: boolean,
  label?: string,
  name?: string,
  onChange: Function,
  value: any,
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
        flexDirection: 'row',
        alignItems: 'center',
        transition: 'filter 500ms ease-in-out',
        filter: isChecked ? undefined : 'grayscale(100%)',
      })}
    >
      <input
        checked={isChecked}
        disabled={isDisabled}
        name={name}
        onChange={onChange}
        type="radio"
        value={value}
      />
      <div
        {...css({
          flex: '0 0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginLeft: '0.5rem',
        })}
      >
        {label && <small>{label}</small>}
        <IconComponent
          {...css({
            width: '3rem',
            height: '3rem',
            margin: '0.5rem 0',
          })}
        />
      </div>
    </label>
  );
}

/* @flow */

import * as React from 'react';
import { css } from 'glamor';

type Props = {
  children: React.Node,
  onClick?: Function,
  type: 'cancel' | 'delete' | 'save',
};

export default function FormButton({ children, onClick, type }: Props) {
  let backgroundColor, color;
  switch (type) {
    case 'cancel':
      backgroundColor = '#ddd';
      color = '#333';
      break;
    case 'delete':
      backgroundColor = '#dd2c00';
      color = '#fff';
      break;
    case 'save':
      backgroundColor = '#00c853';
      color = '#fff';
      break;
    default:
      console.warn(`Invalid FormButton type "${type}" specified.`);
      break;
  }

  return (
    <button
      {...css({
        width: '100%',
        appearance: 'none',
        border: 'none',
        padding: '0.5rem 1rem',
        marginBottom: '0.5rem',
        backgroundColor,
        color,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

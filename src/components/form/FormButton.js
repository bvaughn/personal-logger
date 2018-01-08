import React from 'react';
import { css } from 'glamor';

export default function FormButton({ children, ...props }) {
  return (
    <button
      {...props}
      {...css({
        width: '100%',
        appearance: 'none',
        border: 'none',
        padding: '0.5rem 1rem',
        '&.new-form-save-button': {
          backgroundColor: '#00c853',
          color: '#fff',
        },
        '&.new-form-delete-button': {
          backgroundColor: '#dd2c00',
          color: '#fff',
        },
        '&.new-form-cancel-button': {
          backgroundColor: '#ddd',
          color: '#333',
        },
      })}
    >
      {children}
    </button>
  );
}

/* @flow */

import * as React from 'react';
import { css } from 'glamor';

type Props = {
  children: React.Node,
};

export default function FormSectionHeader({ children }: Props) {
  return (
    <div
      {...css({
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '0.5rem',
        '&.new-form-section-header-types': {
          alignItems: 'flex-start',
          justifyContent: 'space-around',
        },
        '& > *': { marginRight: '1rem' },
        '& > *:last-child': { marginRight: '0' },
        '& .new-form-section-header-svg': {
          width: '1.25rem',
          height: '1.25rem',
          flex: '0 0 1.25rem',
        },
        '& .new-form-date-time-input': { flex: '1 1 auto' },
        '& .new-form-section-header-spacer': { flex: '1 0 auto' },
        '& .new-form-input': {
          width: '100%',
          marginBottom: '0.5rem',
        },
        '& .new-form-type-svg': {
          width: '3rem',
          height: '3rem',
          margin: '0.5rem 0',
          filter: 'grayscale(100%)',
          transition: 'filter 500ms ease-in-out',
        },
        '& .new-form-type-svg-active': { filter: 'grayscale(0%)' },
        '& .new-form-rating-svg': {
          width: '3rem',
          height: '3rem',
          marginBottom: '0.5rem',
          filter: 'grayscale(100%)',
          transition: 'filter 500ms ease-in-out',
          '@media (max-width: 360px)': {
            width: '2rem',
            height: '2rem',
          },
        },
        '& .new-form-rating-svg-active': { filter: 'grayscale(0%)' },
        '& .new-form-radio-label': {
          flex: '0 1 auto',
          padding: '0.25rem',
          display: 'flex',
          alignItems: 'center',
        },
        '& .new-form-rating-radio-label': {
          flex: '0 0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        '& .new-form-checkbox': { marginRight: '0.5rem' },
        '& .new-form-textarea': { width: '100%' },
      })}
    >
      {children}
    </div>
  );
}

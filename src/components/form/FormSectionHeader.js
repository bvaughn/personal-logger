/* @flow */

import * as React from 'react';
import { css } from 'glamor';

type Props = {
  alignment?: 'around' | 'between',
  children: React.Node,
};

export default function FormSectionHeader({
  alignment = 'around',
  children,
}: Props) {
  return (
    <div
      {...css({
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: `space-${alignment}`,
        alignItems: 'center',
        marginBottom: '0.5rem',
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
        '& .new-form-checkbox': { marginRight: '0.5rem' },
        '& .new-form-textarea': { width: '100%' },
      })}
    >
      {children}
    </div>
  );
}

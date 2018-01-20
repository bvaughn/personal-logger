import React from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

export default function ListEntry({ children, ...props }) {
  return (
    <Link
      {...props}
      {...css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '2rem',
        marginBottom: '1rem',
      })}
    >
      {children}
    </Link>
  );
}

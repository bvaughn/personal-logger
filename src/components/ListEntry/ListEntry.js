import React from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

export default function ListEntry({ children, id, to, style, ...props }) {
  return (
    <Link
      to={to}
      params={{ id }}
      style={style}
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

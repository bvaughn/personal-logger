// @flow

import * as React from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

type Props = {
  children: React.Node,
};

export default function ListEntry({ children, ...rest }: Props) {
  return (
    <Link
      {...rest}
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

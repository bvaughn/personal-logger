// @flow

import * as React from 'react';
import { css } from 'glamor';

type Props = {
  children: React.Node,
};

export default function ListEntryTitle({ children }: Props) {
  return (
    <div
      {...css({
        minWidth: '0',
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
      })}
    >
      {children}
    </div>
  );
}

// @flow

import * as React from 'react';
import { css } from 'glamor';

type Props = {
  children: React.Node,
};

export default function ListEntryTime({ children }: Props) {
  return (
    <div
      {...css({
        flex: '0 0 80px',
        textTransform: 'lowercase',
      })}
    >
      {children}
    </div>
  );
}

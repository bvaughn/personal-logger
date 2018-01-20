import React from 'react';
import { css } from 'glamor';

export default function ListEntryTitle({ children }) {
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

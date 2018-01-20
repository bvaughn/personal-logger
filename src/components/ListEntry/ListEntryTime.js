import React from 'react';
import { css } from 'glamor';

export default function ListEntryTime({ children }) {
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

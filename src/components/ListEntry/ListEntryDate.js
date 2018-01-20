import React from 'react';
import { css } from 'glamor';

export default function ListEntryDate({ children }) {
  return <small {...css({ flex: '0 0 70px' })}>{children}</small>;
}

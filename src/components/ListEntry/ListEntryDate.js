// @flow

import * as React from 'react';
import { css } from 'glamor';

type Props = {
  children: React.Node,
};

export default function ListEntryDate({ children }: Props) {
  return <small {...css({ flex: '0 0 70px' })}>{children}</small>;
}

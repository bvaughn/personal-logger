// @flow

import React from 'react';
import { css } from 'glamor';
import { LoadingIcon } from '../components/SvgIcons';

export default function LoadingSpinner() {
  return (
    <div
      {...css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      })}
    >
      <LoadingIcon {...css({ width: '5rem', height: '5rem' })} />
    </div>
  );
}

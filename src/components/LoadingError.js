import React from 'react';
import { css } from 'glamor';

import { NotFoundIcon } from '../components/SvgIcons';

export default function LoadingError() {
  return (
    <div
      className="loading-error"
      {...css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      })}
    >
      <NotFoundIcon className="loading-error-svg" />
    </div>
  );
}

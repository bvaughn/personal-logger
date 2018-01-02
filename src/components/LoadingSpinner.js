import React from 'react';
import { css } from 'glamor';
import { LoadingIcon, NotFoundIcon } from '../components/SvgIcons';

export default function LoadingSpinner({ error = false }) {
  const svgSizeStyle = { width: '5rem', height: '5rem' };
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
      {error ? (
        <NotFoundIcon {...css(svgSizeStyle)} />
      ) : (
        <LoadingIcon {...css(svgSizeStyle)} />
      )}
    </div>
  );
}

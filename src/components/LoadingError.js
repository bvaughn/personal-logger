import React from 'react';
import { NotFoundIcon } from '../components/SvgIcons';

export default function LoadingError() {
  return (
    <div className="loading-error">
      <NotFoundIcon className="loading-error-svg" />
    </div>
  );
}

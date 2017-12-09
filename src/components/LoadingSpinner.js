import React from 'react';
import { LoadingIcon } from '../components/SvgIcons';

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <LoadingIcon className="loading-spinner-svg" />
    </div>
  );
}

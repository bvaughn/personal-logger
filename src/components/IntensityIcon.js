// @flow

import React from 'react';

type Props = {
  className?: string,
  intensity: number,
};

export default function IntensityIcon({ className, intensity }: Props) {
  switch (intensity) {
    case 1:
      return <IntensityLowIcon className={className} />;
    case 2:
      return <IntensityMediumIcon className={className} />;
    case 3:
      return <IntensityHighIcon className={className} />;
    default:
      throw Error(`Invalid intensity "${intensity}" specified.`);
  }
}

const IntensityLowIcon = props => (
  <svg {...props} viewBox="0 0 40 40">
    <rect
      style={{ fill: '#00c853' }}
      y="20"
      width="10"
      height="20"
      rx="2"
      ry="2"
    />
    <rect
      style={{ fill: '#bdbdbd' }}
      x="15"
      y="10"
      width="10"
      height="30"
      rx="2"
      ry="2"
    />
    <rect
      style={{ fill: '#bdbdbd' }}
      x="30"
      width="10"
      height="40"
      rx="2"
      ry="2"
    />
  </svg>
);

const IntensityMediumIcon = props => (
  <svg {...props} viewBox="0 0 40 40">
    <rect
      style={{ fill: '#00c853' }}
      y="20"
      width="10"
      height="20"
      rx="2"
      ry="2"
    />
    <rect
      style={{ fill: '#00c853' }}
      x="15"
      y="10"
      width="10"
      height="30"
      rx="2"
      ry="2"
    />
    <rect
      style={{ fill: '#bdbdbd' }}
      x="30"
      width="10"
      height="40"
      rx="2"
      ry="2"
    />
  </svg>
);

const IntensityHighIcon = props => (
  <svg {...props} viewBox="0 0 40 40">
    <rect
      style={{ fill: '#00c853' }}
      y="20"
      width="10"
      height="20"
      rx="2"
      ry="2"
    />
    <rect
      style={{ fill: '#00c853' }}
      x="15"
      y="10"
      width="10"
      height="30"
      rx="2"
      ry="2"
    />
    <rect
      style={{ fill: '#00c853' }}
      x="30"
      width="10"
      height="40"
      rx="2"
      ry="2"
    />
  </svg>
);

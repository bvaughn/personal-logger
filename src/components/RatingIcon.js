// @flow

import React from 'react';

type Props = {
  className?: string,
  rating: number,
};

export default function RatingIcon({ className, rating }: Props) {
  switch (rating) {
    case 0:
      return <WorstIcon className={className} />;
    case 1:
      return <BadIcon className={className} />;
    case 2:
      return <NeutralIcon className={className} />;
    case 3:
      return <GoodIcon className={className} />;
    case 4:
      return <BestIcon className={className} />;
    default:
      throw Error(`Invalid rating "${rating}" specified.`);
  }
}

const FILL_YELLOW_LIGHT = { fill: '#fd5' };
const FILL_YELLOW_DARK = { fill: '#a80' };
const FILL_WHITE = { fill: '#fff' };

const STROKE_DARK = {
  fill: 'none',
  stroke: '#a80',
  strokeLinecap: 'round',
  strokeWidth: 2,
  strokeMiterlimit: 10,
};

const STROKE_MEDIUM = {
  fill: 'none',
  stroke: '#e0be54',
  strokeLinecap: 'round',
  strokeWidth: 2,
  strokeMiterlimit: 10,
};

const BadIcon = props => (
  <svg {...props} viewBox="0 0 40 40">
    <circle style={FILL_YELLOW_LIGHT} cx="20" cy="20" r="20" />
    <circle style={FILL_WHITE} cx="12" cy="14" r="5" />
    <circle style={FILL_YELLOW_DARK} cx="12" cy="14" r="3" />
    <circle style={FILL_WHITE} cx="28" cy="14" r="5" />
    <circle style={FILL_YELLOW_DARK} cx="28" cy="14" r="3" />
    <path style={STROKE_MEDIUM} d="M28,31c-3-4-8-4-8-4s-5,0-8,4" />
  </svg>
);

const BestIcon = props => (
  <svg {...props} viewBox="0 0 40 40">
    <circle style={FILL_YELLOW_LIGHT} cx="20" cy="20" r="20" />
    <path style={STROKE_DARK} d="M8,15a4,4,0,0,1,4-4" />
    <path style={STROKE_DARK} d="M12,11a4,4,0,0,1,4,4" />
    <path style={STROKE_DARK} d="M24,15a4,4,0,0,1,4-4" />
    <path style={STROKE_DARK} d="M28,11a4,4,0,0,1,4,4" />
    <path style={STROKE_MEDIUM} d="M28,25a8,8,0,0,1-8,8" />
    <path style={STROKE_MEDIUM} d="M20,33a8,8,0,0,1-8-8" />
  </svg>
);

const GoodIcon = props => (
  <svg {...props} viewBox="0 0 40 40">
    <circle style={FILL_YELLOW_LIGHT} cx="20" cy="20" r="20" />
    <circle style={FILL_WHITE} cx="12" cy="14" r="5" />
    <circle style={FILL_YELLOW_DARK} cx="12" cy="14" r="3" />
    <circle style={FILL_WHITE} cx="28" cy="14" r="5" />
    <circle style={FILL_YELLOW_DARK} cx="28" cy="14" r="3" />
    <path style={STROKE_MEDIUM} d="M12,27c3,4,8,4,8,4s5,0,8-4" />
  </svg>
);

const NeutralIcon = props => (
  <svg {...props} viewBox="0 0 40 40">
    <circle style={FILL_YELLOW_LIGHT} cx="20" cy="20" r="20" />
    <circle style={FILL_WHITE} cx="12" cy="14" r="5" />
    <circle style={FILL_YELLOW_DARK} cx="12" cy="14" r="3" />
    <circle style={FILL_WHITE} cx="28" cy="14" r="5" />
    <circle style={FILL_YELLOW_DARK} cx="28" cy="14" r="3" />
    <line style={STROKE_MEDIUM} x1="12" y1="28" x2="28" y2="28" />
  </svg>
);

const WorstIcon = props => (
  <svg {...props} viewBox="0 0 40 40">
    <circle style={FILL_YELLOW_LIGHT} cx="20" cy="20" r="20" />
    <path style={STROKE_DARK} d="M8,15a4,4,0,0,1,4-4" />
    <path style={STROKE_DARK} d="M12,11a4,4,0,0,1,4,4" />
    <path style={STROKE_DARK} d="M24,15a4,4,0,0,1,4-4" />
    <path style={STROKE_DARK} d="M28,11a4,4,0,0,1,4,4" />
    <path style={STROKE_MEDIUM} d="M12,31a8,8,0,0,1,8-8" />
    <path style={STROKE_MEDIUM} d="M20,23a8,8,0,0,1,8,8" />
  </svg>
);

// @flow

import React from 'react';
import { BadFaceIcon, BestFaceIcon, GoodFaceIcon, NeutralFaceIcon, WorstFaceIcon } from './FlatIcon';

type Props = {
  className?: string,
  rating: number,
};

export default function RatingIcon({ className, rating }: Props) {
  switch (rating) {
    case 0:
      return <WorstFaceIcon className={className} />;
    case 1:
      return <BadFaceIcon className={className} />;
    case 2:
      return <NeutralFaceIcon className={className} />;
    case 3:
      return <GoodFaceIcon className={className} />;
    case 4:
      return <BestFaceIcon className={className} />
    default:
      throw Error(`Invalid rating "${rating}" specified.`)
  }
}
import React from 'react';
import { css } from 'glamor';
import { CreateIcon } from './SvgIcons';

const CreateLinkIcon = props => (
  <div
    {...css({
      position: 'absolute',
      bottom: '1rem',
      right: '1rem',
      width: '3rem',
      height: '3rem',
      padding: '0.75rem',
      borderRadius: '3rem',
      background: '#eceff1',
    })}
  >
    <CreateIcon />
  </div>
);

export default CreateLinkIcon;

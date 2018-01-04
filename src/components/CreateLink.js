import React from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';
import { CreateIcon } from './SvgIcons';

const CreateLink = ({ to }) => (
  <Link
    to={to}
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
  </Link>
);

export default CreateLink;

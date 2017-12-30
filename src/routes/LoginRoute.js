// @flow

import React, { Component } from 'react';
import { css } from 'glamor';

import GitHubIcon from '../images/GitHub.svg';
import TwitterIcon from '../images/Twitter.svg';

import type { AuthenticationType } from '../types';

type Props = {
  login: (type: AuthenticationType) => void,
};

export default class ListSymptoms extends Component<Props> {
  render() {
    const { login } = this.props;

    const signInButtonStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: '0.5rem',
      borderRadius: '0.25em',
      marginBottom: '1rem',
      padding: '1rem',
      cursor: 'pointer',
    };

    const signInIconStyle = {
      marginRight: '0.5rem',
      width: '2rem',
      height: '2rem',
    };

    return (
      <ul
        className="sign-in-screen"
        {...css({
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          margin: '0',
          padding: '0',
        })}
      >
        <li
          className="sign-in-button"
          onClick={() => login('github')}
          {...css(signInButtonStyle)}
        >
          <img
            alt="Sign in with GitHub"
            className="sign-in-icon"
            src={GitHubIcon}
            {...css(signInIconStyle)}
          />
          Sign in with GitHub
        </li>

        <li
          className="sign-in-button"
          onClick={() => login('twitter')}
          {...css(signInButtonStyle)}
        >
          <img
            alt="Sign in with Twitter"
            className="sign-in-icon"
            src={TwitterIcon}
            {...css(signInIconStyle)}
          />
          Sign in with Twitter
        </li>
      </ul>
    );
  }
}

// @flow

import React, { Component } from 'react';
import GoogleIcon from '../images/Google.svg';
import GitHubIcon from '../images/GitHub.svg';
import TwitterIcon from '../images/Twitter.svg';

import type { AuthenticationType } from '../types';

type Props = {
  login: (type: AuthenticationType) => void,
};

export default class ListSymptoms extends Component<Props> {
  render() {
    const { login } = this.props;

    return (
      <ul className="sign-in-screen">
        <li className="sign-in-button" onClick={() => login('github')}>
          <img
            alt="Sign in with GitHub"
            className="sign-in-icon"
            src={GitHubIcon}
          />
          Sign in with GitHub
        </li>

        <li className="sign-in-button" onClick={() => login('google')}>
          <img
            alt="Sign in with Google"
            className="sign-in-icon"
            src={GoogleIcon}
          />
          Sign in with Google
        </li>

        <li className="sign-in-button" onClick={() => login('twitter')}>
          <img
            alt="Sign in with Twitter"
            className="sign-in-icon"
            src={TwitterIcon}
          />
          Sign in with Twitter
        </li>
      </ul>
    );
  }
}

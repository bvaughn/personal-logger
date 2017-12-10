// @flow

import React, { Component } from 'react';
import GoogleAuthIcon from '../images/GoogleAuth.svg';

type Props = {
  login: () => void,
};

export default class ListSymptoms extends Component<Props> {
  render() {
    return (
      <div className="sign-in-screen">
        <div className="sign-in-button" onClick={this.props.login}>
          <img
            alt="Sign in with Google"
            className="sign-in-icon"
            src={GoogleAuthIcon}
          />
          Sign in with Google
        </div>
      </div>
    );
  }
}

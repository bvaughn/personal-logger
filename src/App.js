// @flow

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  NavLink,
} from 'react-router-dom';
import DataStore from './DataStore';
import {
  EditFoodRoute,
  EditSleepRoute,
  EditSymptomRoute,
  ListFoodsRoute,
  ListSleepRoute,
  ListSymptomsRoute,
  NewFoodRoute,
  NewSleepRoute,
  NewSymptomRoute,
} from './routes';
import LoadingSpinner from './components/LoadingSpinner';
import {
  EatIcon,
  LogoutIcon,
  SleepIcon,
  SymptomIcon,
} from './components/SvgIcons';
import { ROUTES } from './constants';
import './App.css';

import type { Food, Sleep, Symptom, User } from './types';

type Props = {};
type State = {
  authenticated: boolean,
  avatarPhoto: ?string,
  foods: Array<Food>,
  sleep: Array<Sleep>,
  symptoms: Array<Symptom>,
};

class App extends Component<Props, State> {
  _dataStore: DataStore = new DataStore();

  state: State = {
    authenticated: false,
    avatarPhoto: null,
    foods: [],
    sleep: [],
    symptoms: [],
  };

  componentDidMount() {
    this._dataStore.authenticate().then((user: User) => {
      this.setState({
        authenticated: true,
        avatarPhoto: user && user.photoURL,
      });

      this._dataStore.foods.registerObserver(foods => this.setState({ foods }));
      this._dataStore.sleep.registerObserver(sleep => this.setState({ sleep }));
      this._dataStore.symptoms.registerObserver(symptoms =>
        this.setState({ symptoms })
      );
    });
  }

  render() {
    const { authenticated, avatarPhoto, foods, sleep, symptoms } = this.state;

    if (!authenticated) {
      return <LoadingSpinner />;
    }

    return (
      <Router>
        <div className="app">
          <header className="header">
            <div className="header-title-row">
              <div className="header-user-avatar">
                <img
                  alt="User avatar"
                  className="header-user-avatar-img"
                  src={avatarPhoto}
                />
              </div>

              <div className="header-title">Personal Log</div>

              <div
                className="header-logout-button"
                onClick={this._dataStore.signout}
                tabIndex={0}
              >
                <LogoutIcon className="header-logout-button-svg" />
              </div>
            </div>

            <nav className="nav">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to={ROUTES.sleep.list}
              >
                <SleepIcon className="nav-link-svg" />
              </NavLink>
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to={ROUTES.foods.list}
              >
                <EatIcon className="nav-link-svg" />
              </NavLink>
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to={ROUTES.symptoms.list}
              >
                <SymptomIcon className="nav-link-svg" />
              </NavLink>
            </nav>
          </header>

          <main className="main">
            <Route
              exact
              path="/"
              render={() => <Redirect to={ROUTES.sleep.list} />}
            />

            <Route
              exact
              path={ROUTES.foods.new}
              render={() => (
                <NewFoodRoute saveFn={this._dataStore.foods.saveRecord} />
              )}
            />
            <Route
              exact
              path={ROUTES.foods.edit}
              render={({ match }) => (
                <EditFoodRoute
                  deleteFn={this._dataStore.foods.deleteRecord}
                  foods={foods}
                  id={match.params.id}
                  saveFn={this._dataStore.foods.saveRecord}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.foods.list}
              render={() => <ListFoodsRoute foods={foods} />}
            />

            <Route
              exact
              path={ROUTES.sleep.new}
              render={() => (
                <NewSleepRoute saveFn={this._dataStore.sleep.saveRecord} />
              )}
            />
            <Route
              exact
              path={ROUTES.sleep.edit}
              render={({ match }) => (
                <EditSleepRoute
                  deleteFn={this._dataStore.sleep.deleteRecord}
                  id={match.params.id}
                  saveFn={this._dataStore.sleep.saveRecord}
                  sleep={sleep}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.sleep.list}
              render={() => <ListSleepRoute sleep={sleep} />}
            />

            <Route
              exact
              path={ROUTES.symptoms.new}
              render={() => (
                <NewSymptomRoute saveFn={this._dataStore.symptoms.saveRecord} />
              )}
            />
            <Route
              exact
              path={ROUTES.symptoms.edit}
              render={({ match }) => (
                <EditSymptomRoute
                  deleteFn={this._dataStore.symptoms.deleteRecord}
                  id={match.params.id}
                  saveFn={this._dataStore.symptoms.saveRecord}
                  symptoms={symptoms}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.symptoms.list}
              render={() => <ListSymptomsRoute symptoms={symptoms} />}
            />
          </main>
        </div>
      </Router>
    );
  }

  _onDataStoreChanged = (state: State) => {
    this.setState(state);
  };
}

export default App;

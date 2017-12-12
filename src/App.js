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
  EditExerciseRoute,
  EditFoodRoute,
  EditSleepRoute,
  EditSymptomRoute,
  ListExerciseRoute,
  ListFoodsRoute,
  ListSleepRoute,
  ListSymptomsRoute,
  LoginRoute,
  NewExerciseRoute,
  NewFoodRoute,
  NewSleepRoute,
  NewSymptomRoute,
} from './routes';
import LoadingSpinner from './components/LoadingSpinner';
import {
  EatIcon,
  HeartIcon,
  LogoutIcon,
  SleepIcon,
  SymptomIcon,
} from './components/SvgIcons';
import { ROUTES } from './constants';
import './App.css';

import type { Exercise, Food, Sleep, Symptom, User } from './types';

type Props = {};
type State = {
  authenticated: boolean | null,
  avatarPhoto: ?string,
  exercise: Array<Exercise> | null,
  foods: Array<Food> | null,
  sleep: Array<Sleep> | null,
  symptoms: Array<Symptom> | null,
};

class App extends Component<Props, State> {
  _dataStore: DataStore = new DataStore();

  state: State = {
    authenticated: null,
    avatarPhoto: null,
    exercise: null,
    foods: null,
    sleep: null,
    symptoms: null,
  };

  componentDidMount() {
    this._dataStore.checkAuth().then(
      (user: User) => {
        this.setState({
          authenticated: true,
          avatarPhoto: user && user.photoURL,
        });

        this._dataStore.exercise.registerObserver(exercise =>
          this.setState({ exercise })
        );
        this._dataStore.foods.registerObserver(foods =>
          this.setState({ foods })
        );
        this._dataStore.sleep.registerObserver(sleep =>
          this.setState({ sleep })
        );
        this._dataStore.symptoms.registerObserver(symptoms =>
          this.setState({ symptoms })
        );
      },
      error => {
        this.setState({
          authenticated: false,
        });
      }
    );
  }

  render() {
    const {
      authenticated,
      avatarPhoto,
      exercise,
      foods,
      sleep,
      symptoms,
    } = this.state;

    if (authenticated === null) {
      return <LoadingSpinner />;
    } else if (authenticated === false) {
      return <LoginRoute login={this._dataStore.login} />;
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
                onClick={this._signOut}
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
                to={ROUTES.exercise.list}
              >
                <HeartIcon className="nav-link-svg" />
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
              path={ROUTES.exercise.new}
              render={() => (
                <NewExerciseRoute
                  saveFn={this._dataStore.exercise.saveRecord}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.exercise.edit}
              render={({ match }) => (
                <EditExerciseRoute
                  deleteFn={this._dataStore.exercise.deleteRecord}
                  getRecord={this._dataStore.exercise.getRecord}
                  id={match.params.id}
                  saveFn={this._dataStore.exercise.saveRecord}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.exercise.list}
              render={() => <ListExerciseRoute exercise={exercise} />}
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
                  getRecord={this._dataStore.foods.getRecord}
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
                  getRecord={this._dataStore.sleep.getRecord}
                  id={match.params.id}
                  saveFn={this._dataStore.sleep.saveRecord}
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
                  getRecord={this._dataStore.symptoms.getRecord}
                  id={match.params.id}
                  saveFn={this._dataStore.symptoms.saveRecord}
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

  _signOut = () =>
    this._dataStore.signout().then(() =>
      this.setState({
        authenticated: false,
      })
    );
}

export default App;

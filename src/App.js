// @flow

import React, { Component } from 'react';
import { css } from 'glamor';
import {
  HashRouter as Router,
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

    const navLinkStyle = {
      color: '#fff',
      filter: 'grayscale(100%)',
      transition: 'filter 500ms ease-in-out',
      cursor: 'pointer',
    };

    const navActiveLinkStyle = {
      color: '#1da1f2',
      filter: 'grayscale(0%)',
    };

    const navLinkSvg = css({
      width: '2rem',
      height: '2rem',
      fill: 'currentColor',
    });

    return (
      <Router>
        <div
          className="app"
          {...css({
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          })}
        >
          <header
            className="header"
            {...css({
              marginBottom: '1rem',
              backgroundColor: '#263238',
              color: '#ffffff',
              padding: '0.5rem',
            })}
          >
            <div
              className="header-title-row"
              {...css({
                flex: '0 0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              })}
            >
              <div
                className="header-user-avatar"
                {...css({
                  flex: '0 0 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                })}
              >
                <img
                  alt="User avatar"
                  className="header-user-avatar-img"
                  src={avatarPhoto}
                  {...css({
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '1.5rem',
                  })}
                />
              </div>

              <div
                className="header-title"
                {...css({
                  flex: '1 1 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                })}
              >
                Personal Log
              </div>

              <div
                className="header-logout-button"
                onClick={this._signOut}
                tabIndex={0}
                {...css({
                  flex: '0 0 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                })}
              >
                <LogoutIcon
                  className="header-logout-button-svg"
                  {...css({
                    width: '1.5rem',
                    height: '1.5rem',
                    color: '#fff',
                  })}
                />
              </div>
            </div>

            <nav
              className="nav"
              {...css({
                display: 'flex',
                justifyContent: 'space-around',
              })}
            >
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to={ROUTES.sleep.list}
                {...css(navLinkStyle)}
                activeStyle={navActiveLinkStyle}
              >
                <SleepIcon className={navLinkSvg} />
              </NavLink>
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to={ROUTES.foods.list}
                {...css(navLinkStyle)}
                activeStyle={navActiveLinkStyle}
              >
                <EatIcon className={navLinkSvg} />
              </NavLink>
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to={ROUTES.exercise.list}
                {...css(navLinkStyle)}
                activeStyle={navActiveLinkStyle}
              >
                <HeartIcon className={navLinkSvg} />
              </NavLink>
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to={ROUTES.symptoms.list}
                {...css(navLinkStyle)}
                activeStyle={navActiveLinkStyle}
              >
                <SymptomIcon className={navLinkSvg} />
              </NavLink>
            </nav>
          </header>

          <main
            className="main"
            {...css({
              padding: '0 1em',
              marginBottom: '1em',
              flex: '1 1 auto',
              minHeight: '0',
              overflow: 'auto',
            })}
          >
            <Route
              exact
              path="/"
              render={({ history }) => <Redirect to={ROUTES.sleep.list} />}
            />

            <Route
              exact
              path={ROUTES.exercise.new}
              render={({ history }) => (
                <NewExerciseRoute
                  history={history}
                  saveFn={this._dataStore.exercise.saveRecord}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.exercise.edit}
              render={({ history, match }) => (
                <EditExerciseRoute
                  deleteFn={this._dataStore.exercise.deleteRecord}
                  getRecord={this._dataStore.exercise.getRecord}
                  history={history}
                  id={match.params.id}
                  saveFn={this._dataStore.exercise.saveRecord}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.exercise.list}
              render={({ history }) => (
                <ListExerciseRoute history={history} exercise={exercise} />
              )}
            />

            <Route
              exact
              path={ROUTES.foods.new}
              render={({ history }) => (
                <NewFoodRoute
                  history={history}
                  saveFn={this._dataStore.foods.saveRecord}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.foods.edit}
              render={({ history, match }) => (
                <EditFoodRoute
                  deleteFn={this._dataStore.foods.deleteRecord}
                  getRecord={this._dataStore.foods.getRecord}
                  history={history}
                  id={match.params.id}
                  saveFn={this._dataStore.foods.saveRecord}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.foods.list}
              render={({ history }) => (
                <ListFoodsRoute history={history} foods={foods} />
              )}
            />

            <Route
              exact
              path={ROUTES.sleep.new}
              render={({ history }) => (
                <NewSleepRoute
                  history={history}
                  saveFn={this._dataStore.sleep.saveRecord}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.sleep.edit}
              render={({ history, match }) => (
                <EditSleepRoute
                  deleteFn={this._dataStore.sleep.deleteRecord}
                  getRecord={this._dataStore.sleep.getRecord}
                  history={history}
                  id={match.params.id}
                  saveFn={this._dataStore.sleep.saveRecord}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.sleep.list}
              render={({ history }) => (
                <ListSleepRoute history={history} sleep={sleep} />
              )}
            />

            <Route
              exact
              path={ROUTES.symptoms.new}
              render={({ history }) => (
                <NewSymptomRoute
                  history={history}
                  saveFn={this._dataStore.symptoms.saveRecord}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.symptoms.edit}
              render={({ history, match }) => (
                <EditSymptomRoute
                  deleteFn={this._dataStore.symptoms.deleteRecord}
                  getRecord={this._dataStore.symptoms.getRecord}
                  history={history}
                  id={match.params.id}
                  saveFn={this._dataStore.symptoms.saveRecord}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.symptoms.list}
              render={({ history }) => (
                <ListSymptomsRoute history={history} symptoms={symptoms} />
              )}
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

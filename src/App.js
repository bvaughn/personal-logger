// @flow

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink
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
  NewSymptomRoute
} from './routes';
import { CreateIcon, EatIcon, SleepIcon, SymptomIcon } from './components/FlatIcon';
import { ROUTES } from './constants';
import "./App.css";

import type { Food, Sleep, Symptom } from './types';

type Props = {};
type State = {
  foods: Array<Food>,
  sleep: Array<Sleep>,
  symptoms: Array<Symptom>,
};

class App extends Component<Props, State> {
  _dataStore: DataStore;

  state: State = {
    foods: [],
    sleep: [],
    symptoms: [],
  };

  constructor() {
    super();

    this._dataStore = new DataStore(this._onDataStoreChanged);
  }

  render() {
    const {foods, sleep, symptoms} = this.state;

    return (
      <Router>
        <div className="app">
          <header className="header">
            <nav className="nav">
              <NavListItem
                createPath={ROUTES.sleep.new}
                listPath={ROUTES.sleep.list}
                Icon={SleepIcon}
              />
              <NavListItem
                createPath={ROUTES.foods.new}
                listPath={ROUTES.foods.list}
                Icon={EatIcon}
              />
              <NavListItem
                createPath={ROUTES.symptoms.new}
                listPath={ROUTES.symptoms.list}
                Icon={SymptomIcon}
              />
            </nav>
          </header>

          <main className="main">
            <Route
              exact
              path={ROUTES.foods.new}
              render={() => (
                <NewFoodRoute saveFn={this._dataStore.saveFood} />
              )}
            />
            <Route
              exact
              path={ROUTES.foods.edit}
              render={({ match }) => (
                <EditFoodRoute
                  deleteFn={this._dataStore.delete}
                  foods={foods}
                  id={match.params.id}
                  saveFn={this._dataStore.saveFood}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.foods.list}
              render={() => (
                <ListFoodsRoute foods={foods} />
              )}
            />

            <Route
              exact
              path={ROUTES.sleep.new}
              render={() => (
                <NewSleepRoute saveFn={this._dataStore.saveSleep} />
              )}
            />
            <Route
              exact
              path={ROUTES.sleep.edit}
              render={({ match }) => (
                <EditSleepRoute
                  deleteFn={this._dataStore.delete}
                  id={match.params.id}
                  saveFn={this._dataStore.saveSleep}
                  sleep={sleep}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.sleep.list}
              render={() => (
                <ListSleepRoute sleep={sleep} />
              )}
            />

            <Route
              exact
              path={ROUTES.symptoms.new}
              render={() => (
                <NewSymptomRoute saveFn={this._dataStore.saveSymptom} />
              )}
            />
            <Route
              exact
              path={ROUTES.symptoms.edit}
              render={({ match }) => (
                <EditSymptomRoute
                  deleteFn={this._dataStore.delete}
                  id={match.params.id}
                  saveFn={this._dataStore.saveSymptom}
                  symptoms={symptoms}
                />
              )}
            />
            <Route
              exact
              path={ROUTES.symptoms.list}
              render={() => (
                <ListSymptomsRoute symptoms={symptoms} />
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
}

const NavListItem = ({ createPath, Icon, listPath }) => (
  <div className="nav-list-item">
    <NavLink
      activeClassName="nav-link-active"
      className="nav-link"
      to={listPath}
    >
      <Icon className="nav-link-svg nav-link-svg-category" />
    </NavLink>
    <NavLink
      activeClassName="nav-link-active"
      className="nav-link"
      to={createPath}
    >
      <CreateIcon
        className="nav-link-svg"
      />
    </NavLink>
  </div>
);

export default App;

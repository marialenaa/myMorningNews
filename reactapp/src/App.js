import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux'

import wishList from './reducers/articles';

import ScreenHome from './components/ScreenHome';
import ScreenArticlesBySource from './components/ScreenArticlesBySource';
import ScreenSource from './components/ScreenSource';
import ScreenMyArticles from './components/ScreenMyArticles';


const store = createStore(combineReducers({wishList}))

function App() {
  return (

    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome} />
          <Route path="/source" component={ScreenSource} />
          <Route path="/articlesbysource/:id" component={ScreenArticlesBySource} />
          <Route path="/myarticles" component={ScreenMyArticles} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

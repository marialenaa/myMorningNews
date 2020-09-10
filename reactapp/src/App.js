import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import wishlist from './reducers/articles';
import language from './reducers/language';
import token from './reducers/token';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux'


import ScreenHome from './components/ScreenHome';
import ScreenArticlesBySource from './components/ScreenArticlesBySource';
import ScreenSource from './components/ScreenSource';
import ScreenMyArticles from './components/ScreenMyArticles';


const store = createStore(combineReducers({wishlist,token,language}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

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

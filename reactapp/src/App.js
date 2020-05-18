import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import ScreenHome from './components/ScreenHome';
import ScreenArticlesBySource from './components/ScreenArticlesBySource';
import ScreenSource from './components/ScreenSource';
import ScreenMyArticles from './components/ScreenMyArticles';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ScreenHome} />
        <Route path="/articlesbysource/:id" component={ScreenArticlesBySource} />
        <Route path="/source" component={ScreenSource} />
        <Route path="/myarticles" component={ScreenMyArticles} />
      </Switch>
    </Router>
    // <ScreenHome />
  );
}

export default App;

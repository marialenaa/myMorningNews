import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import {
  ConfigProvider,
  Spin
} from 'antd';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux'
import wishlist from './reducers/articles';
import language from './reducers/language';
import token from './reducers/token';

import ScreenHome from './components/ScreenHome';
import ScreenArticlesBySource from './components/ScreenArticlesBySource';
import ScreenSource from './components/ScreenSource';
import ScreenMyArticles from './components/ScreenMyArticles';


const store = createStore(combineReducers({token,language,wishlist}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

function App() {
    const customizeRenderEmpty = () => { 
      return(
    <div className="config-provider">
      <Spin tip="Loading..." />
    </div>)
  }

  return (

    <Provider store={store}>
      <Router>
        <Switch>
            <ConfigProvider renderEmpty={()=> customizeRenderEmpty()}>
                <Route path="/" exact component={ScreenHome} />
                <Route path="/source" component={ScreenSource} />
                <Route path="/articlesbysource/:id" component={ScreenArticlesBySource} />
                <Route path="/myarticles" component={ScreenMyArticles} />
            </ConfigProvider>
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;

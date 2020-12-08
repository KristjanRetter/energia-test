import React, { createContext, useEffect, useState } from 'react';
import './App.sass';
import { AppProvider } from './common/AppContext';
import Service from './pages/service/Service';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import Edit from './pages/edit/Edit';

function App() {
  return (
    <div className='app'>
      <AppProvider>
        <Router>
          <Switch>
            <Route path='/edit'>
              <Edit></Edit>
            </Route>
            <Route path='/'>
              <Service></Service>
            </Route>
          </Switch>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;

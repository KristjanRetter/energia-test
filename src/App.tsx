import React, { createContext, useEffect, useState } from 'react';
import './App.sass';
import { AppProvider } from './common/AppContext';
import Service from './pages/service/Service';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import Edit from './pages/edit/Edit';
import Receipt from './pages/receipt/Receipt';
import ReturnPurchase from './pages/return-purchase/ReturnPurchase';

function App() {
  return (
    <div className='app'>
      <AppProvider>
        <Router>
          <Switch>
            <Route path='/receipt/:id'>
              <Receipt></Receipt>
            </Route>
            <Route path='/edit'>
              <Edit></Edit>
            </Route>
            <Route path='/return-purchase'>
              <ReturnPurchase></ReturnPurchase>
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

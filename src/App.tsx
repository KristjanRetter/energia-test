import React, { createContext, useEffect, useState } from 'react';
import './App.sass';
import { AppProvider } from './pages/service/context';
import Service from './pages/service/Service';

function App() {
  return (
    <div className='app'>
      <AppProvider>
        <Service></Service>
      </AppProvider>
    </div>
  );
}

export default App;

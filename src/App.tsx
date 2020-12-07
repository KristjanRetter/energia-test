import React, { createContext, useEffect, useState } from 'react';
import './App.sass';
import { AppProvider } from './pages/service/context';
import Service from './pages/service/Service';

export const TotalContext = createContext({} as any);

function App() {
  const pretotal = JSON.parse(localStorage.getItem('total') || '0');
  const [total, setTotal] = useState(pretotal);
  const [userssDetails, setUserssDetails] = useState([]);

  // useEffect(() => {
  //   const users: any = [];
  //   console.log('twat');
  //   API.getAllFoods().then((snapshot: any) => {
  //     snapshot.docs.forEach((user: any) => {
  //       const currentID = user.id;
  //       const appObj = { ...user.data(), ['id']: currentID };
  //       users.push(appObj);
  //       console.log(users);
  //     });
  //   });
  // }, []);

  return (
    <div className='app'>
      <AppProvider>
        <TotalContext.Provider value={[total, setTotal]}>
          <Service></Service>
        </TotalContext.Provider>
      </AppProvider>
    </div>
  );
}

export default App;

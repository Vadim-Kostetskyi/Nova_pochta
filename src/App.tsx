import React, { useState } from 'react';

import Parcel from './Parcel';
import Offices from './Offices';
import './App.css';

const App: React.FunctionComponent = () => {
  const [find, setFind] = useState<boolean>(true);

  // const switching = (p: boolean): void => {
  //   console.log(p);
    
  //   setFind(p)
  // }
  
  return (
    <div className="app">
      <div className='operation'>
        <button className='check' onClick={()=>setFind(true)}>Перевірити ТТН</button>
        <button className='offices' onClick={()=>setFind(false)}>Список відділень</button>
      </div>
      {find ? <Parcel/> : <Offices/>}
    </div>
  );
}

export default App;

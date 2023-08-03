import React, { useState } from 'react';

import Parcel from './Parcel';
import Offices from './Offices';
import './App.css';

const App: React.FunctionComponent = () => {
  const [find, setFind] = useState<boolean>(true);

  const switching = (el: React.MouseEvent<HTMLButtonElement>) => {
    if (el.currentTarget.className === 'check') {
      setFind(true)
    }
    else {
      setFind(false)
    }
  }
  
  return (
    <div className="app">
      <div className='operation'>
        <button className='check' onClick={switching}>Перевірити ТТН</button>
        <button className='offices' onClick={switching}>Список відділень</button>
      </div>
      {find ? <Parcel/> : <Offices/>}
    </div>
  );
}

export default App;

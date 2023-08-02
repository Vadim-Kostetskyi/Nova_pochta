import React from 'react';

import Parcel from './Parcel';
import Offices from './Offices';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='operation'>
      <button className='check'>Перевірити ТТН</button>
        <button className='offices'>Список відділень</button>
      </div>
      {/* <Parcel /> */}
      <Offices/>
    </div>
  );
}

export default App;

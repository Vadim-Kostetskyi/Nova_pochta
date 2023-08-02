import React from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='operation'>
      <button className='check'>Перевірити ТТН</button>
      <button className='offices'>Список відділень</button>
      </div>
      <div className='get'>
        <input type="text" className='input' />
      <button className='get-btn'>Get status TTN</button>
      </div>
      <div className='info'>
      <div className='details'>
        <p className='details-text'>Дані посилки</p>
      </div>
      <div className='history'>
          <strong className='history-text'>Історія</strong>
          <ul className='history-list'>
            <li className='history-item'>20400048799002</li>
          </ul>
      </div>
      </div>
    </div>
  );
}

export default App;

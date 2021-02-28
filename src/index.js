import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import setAuthorizationToken from './util/setAuthorizationToken';

store.subscribe(()=>{
  console.log("store changed",store.getState());})
let trial = store.getState().user;

 setAuthorizationToken(localStorage.jwtToken)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



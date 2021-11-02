import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import StoreProvider from './store';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Web3ReactManager from './components/Web3ReactManager';
import { TransactionsProvider } from './store/transactions';
import { PopupsProvider } from './store/popups';
import { Popups } from './components/popups';

function getLibrary(provider) {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
}
ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <StoreProvider>
        <PopupsProvider>
          <TransactionsProvider>
            <ThemeProvider theme={theme}>
              <Web3ReactManager>
                <App />
                <Popups />
              </Web3ReactManager>
            </ThemeProvider>
          </TransactionsProvider>
        </PopupsProvider>
      </StoreProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

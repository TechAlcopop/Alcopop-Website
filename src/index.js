import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { revealWhenReady } from './utils/pageReady';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render as soon as the bundle runs. The splash loader inlined in index.html
// covers the page until revealWhenReady() decides everything has finished
// loading, so React can build the DOM and warm the caches behind it.
// (This used to be wrapped in a window "load" listener, which held the first
// render back until every asset was in and left the page blank until then.)
root.render(<App />);

revealWhenReady();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import ConnectFourGame from './views/ConnectFourGame'
import Layout from './components/Layout'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Layout>
    <ConnectFourGame />
    </Layout>
  </React.StrictMode>
);


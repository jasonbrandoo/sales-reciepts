import React from 'react';
import { Router } from '@reach/router';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Checkout from './components/Checkout';
import { ItemProvider } from './store/ItemContext';
import DailySales from './components/DailySales';

const App = () => {
  return (
    <>
      <Navbar />
      <ItemProvider>
        <Router>
          <Main path="/" />
          <Checkout path="/checkout" />
          <DailySales path="/daily-sales" />
        </Router>
      </ItemProvider>
    </>
  );
};

export default App;

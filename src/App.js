import React from 'react';
import { Router } from '@reach/router';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Checkout from './components/Checkout';
import { ItemProvider } from './store/ItemContext';
import DailySales from './components/DailySales';

const App = () => {
  return (
    <div className="flex flex-col h-screen max-h-full overflow-hidden">
      <Navbar />
      <ItemProvider>
        <Router className="h-full">
          <Main path="/" />
          <Checkout path="checkout" />
          <DailySales path="daily-sales" />
        </Router>
      </ItemProvider>
    </div>
  );
};

export default App;

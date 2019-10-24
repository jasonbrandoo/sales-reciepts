import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Item from './components/Item';
import Detail from './components/Detail';
import { ItemProvider } from './context/ItemContext';

const App = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <Main>
        <ItemProvider>
          <Item />
          <Detail />
        </ItemProvider>
      </Main>
    </div>
  );
};

export default App;

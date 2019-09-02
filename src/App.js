import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Item from './components/Item';
import Detail from './components/Detail';

const App = () => {
  return (
    <>
      <Navbar />
      <Main>
        <Item />
        <Detail />
      </Main>
    </>
  );
};

export default App;

import React from 'react';
import MainItem from './MainItem';
import MainDetail from './MainDetail';

const Main = () => {
  return (
    <div
      className="md:flex md:flex-row md:justify-center "
      style={{ height: 'calc(100vh - 3rem)' }}
    >
      <MainItem />
      <MainDetail />
    </div>
  );
};

export default Main;

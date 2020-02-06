import React from 'react';
import MainItem from './MainItem';
import MainDetail from './MainDetail';

const Main = () => {
  return (
    <div className="sm:flex justify-center h-full">
      <MainItem />
      <MainDetail />
    </div>
  );
};

export default Main;

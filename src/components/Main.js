import React from 'react';
import Item from './Item';
import Detail from './Detail';

const Main = () => {
  return (
    <div className="flex justify-center h-full">
      <Item />
      <Detail />
    </div>
  );
};

export default Main;

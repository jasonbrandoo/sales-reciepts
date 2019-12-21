import React from 'react';
import Item from './Item';
import Detail from './Detail';

const Main = () => {
  return (
    <div className="md:flex sm:block justify-center h-full">
      <Item />
      <Detail />
    </div>
  );
};

export default Main;

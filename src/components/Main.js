import React from 'react';

const Main = props => {
  const { children } = props;
  return <div className="flex justify-center flex-1">{children}</div>;
};

export default Main;

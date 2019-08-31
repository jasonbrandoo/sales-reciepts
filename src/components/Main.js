import React from 'react';

const Main = props => {
  const { children } = props;
  return <div className="flex justify-center h-screen">{children}</div>;
};

export default Main;

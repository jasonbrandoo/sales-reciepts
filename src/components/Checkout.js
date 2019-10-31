import React from 'react';

const Checkout = ({ location }) => {
  const date = new Date().toLocaleDateString('id');
  console.log(date);
  return (
    <div className="w-9/12 mx-auto">
      <h1>{date}</h1>
    </div>
  );
};

export default Checkout;

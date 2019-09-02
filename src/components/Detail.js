import React from 'react';

const Detail = () => {
  return (
    <div className="w-auto bg-gray-100 flex-grow-0">
      <table className="m-8">
        <thead>
          <tr className="text-black text-2xl">
            <th className="pr-64">Name</th>
            <th className="pr-20">Quantity</th>
            <th className="pr-20">Price</th>
            <th className="pr-20">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lorem</td>
            <td>2</td>
            <td>100</td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
      {/* <div className="flex m-4 text-white">
        <h1 className="mr-64 text-2xl">Name</h1>
        <h1 className="mr-20 text-2xl">Quantity</h1>
        <h1 className="mr-20 text-2xl">Price</h1>
        <h1 className="mr-20 text-2xl">Total</h1>
      </div>
      <hr />
      <div className="flex m-4 text-white">
        <h1 className="mr-64 text-2xl">Lorem</h1>
        <h1 className="mr-20 text-2xl">1</h1>
        <h1 className="mr-20 text-2xl">100</h1>
        <h1 className="mr-20 text-2xl">100</h1>
      </div> */}
    </div>
  );
};

export default Detail;

import React from 'react';

const Checkout = ({ location: { state } }) => {
  console.log(state.product);
  const date = new Date().toLocaleDateString('id');
  return (
    <div className="w-9/12 mx-auto bg-blue-100">
      <h1 className="text-2xl">{date}</h1>
      <table className="w-full">
        <thead>
          <tr className="border">
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {state.product.map(i => (
            <tr key={i.item.title}>
              <td>{i.item.title}</td>
              <td>{i.item.quantity}</td>
              <td>{i.item.price}</td>
              <td>
                {i.item['total-price'] ? i.item['total-price'] : i.item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Checkout;

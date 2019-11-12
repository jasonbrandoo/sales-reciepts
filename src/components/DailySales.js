import React, { useEffect, useState } from 'react';
import useReceipt from '../hooks/useReceipt';

const DailySales = () => {
  const [dailySales, setDailySales] = useState([]);
  const { daily } = useReceipt();
  const dates = new Date().toLocaleDateString('id');

  useEffect(() => {
    const test = daily.reduce((acc, curr) => {
      const { date, cart, total } = curr;
      return [
        ...acc,
        {
          [date.getTime()]: {
            total,
            cart,
          },
        },
      ];
    }, []);
    setDailySales(test);
  }, [daily]);

  return (
    <div className="w-9/12 mx-auto bg-blue-100">
      <h1 className="text-2xl">{dates}</h1>
      {daily.map(dailyObj => {
        return (
          <div>
            <h1>{dailyObj.date.getMonth()}</h1>
            <table className="w-full">
              <thead>
                <tr className="border">
                  <th className="text-left w-1/2">Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {dailyObj.cart.map(item => {
                  return (
                    <tr>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>
                        {item['total-price'] ? item['total-price'] : item.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default DailySales;

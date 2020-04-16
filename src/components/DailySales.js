import React, { useEffect, useState } from 'react';
import useReceipt from '../hooks/useReceipt';

const DailySales = () => {
  const { daily, clearDaily } = useReceipt();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    setSales(daily);
  }, [daily]);

  const handleClear = () => {
    setSales([]);
    clearDaily();
  };

  return (
    <div className="w-9/12 h-full mx-auto ">
      <h1 className="text-2xl text-center">Daily Sales</h1>
      {sales.map((dailyObj, index) => {
        const d = dailyObj.date.getDate();
        const m = new Intl.DateTimeFormat('en', { month: 'long' }).format(
          dailyObj.date,
        );
        const y = dailyObj.date.getFullYear();
        const H = dailyObj.date.getHours();
        const M = dailyObj.date.getMinutes();
        const S = dailyObj.date.getSeconds();
        return (
          <div className="mb-8" key={dailyObj.date}>
            <div className="flex items-center justify-between ">
              <div className="text-sm font-hairline">No. {index + 1}</div>
              <div className="text-sm font-hairline">
                {d}/{m}/{y} - {H}:{M}:{S}
              </div>
            </div>
            <table className="w-full border border-black">
              <thead>
                <tr className="border border-black">
                  <th className="w-1/2 pl-5 text-left">Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {dailyObj.cart.map(item => {
                  return (
                    <tr key={item.title}>
                      <td className="pl-5">{item.title}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">$ {item.price}</td>
                      <td className="text-center">
                        ${' '}
                        {item['total-price'] ? item['total-price'] : item.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border border-black">
                  <td className="pl-12 font-semibold">Paid</td>
                  <td />
                  <td />
                  <td className="font-semibold text-center">
                    $ {dailyObj.paid}
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="pl-12 font-semibold">Change</td>
                  <td />
                  <td />
                  <td className="font-semibold text-center">
                    $ {dailyObj.change}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}
      {sales.length === 0 ? (
        <h1 className="text-center">No Records</h1>
      ) : (
        <button
          type="button"
          className="px-2 bg-red-400 hover:bg-red-700 text-white rounded text-2xl"
          onClick={handleClear}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default DailySales;

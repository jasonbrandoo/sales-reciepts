import React from 'react';
import useReceipt from '../hooks/useReceipt';

const DailySales = () => {
  const { daily, clearDaily } = useReceipt();

  const handleClear = () => {
    clearDaily();
  };

  return (
    <div className="w-9/12 mx-auto mb-5">
      <h1 className="text-2xl text-center">Daily Sales</h1>
      {daily.map((dailyObj, index) => {
        return (
          <div className="pb-5" key={dailyObj.date}>
            <div className="flex justify-between items-center">
              <div className="text-xl">{index + 1}</div>
              <div className="text-xl">
                {dailyObj.date.getDate()}/{dailyObj.date.getMonth()}/
                {dailyObj.date.getFullYear()} {dailyObj.date.getHours()}:
                {dailyObj.date.getMinutes()}:{dailyObj.date.getSeconds()}
              </div>
            </div>
            <table className="w-full border">
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
                    <tr key={item.title}>
                      <td>{item.title}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">{item.price}</td>
                      <td className="text-center">
                        {item['total-price'] ? item['total-price'] : item.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border">
                  <td />
                  <td />
                  <td />
                  <td className="text-center font-semibold">
                    {dailyObj.total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}
      {daily.length === 0 ? null : (
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

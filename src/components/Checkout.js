import React, { useState } from 'react';
import Modal from './Modal';
import useReciept from '../hooks/useReceipt';

const Checkout = ({ location: { state } }) => {
  console.log(state);
  const { addDaily } = useReciept();
  const [paid, setPaid] = useState('0');
  const [kemb, setKemb] = useState('0');
  const [open, setOpen] = useState(false);

  const handlePaid = e => {
    const num = e.target.value;
    setPaid(prevState => {
      if (prevState === '0') return num;
      return prevState + num;
    });
  };

  const clearOne = () => {
    const lastIndex = paid.length - 1;
    setPaid(prevState => {
      return prevState.slice(0, lastIndex);
    });
  };

  const handleSubmit = () => {
    const result = parseInt(state.totalPrice) - parseInt(paid);
    setKemb(result);
    const confirm = {
      date: new Date(),
      cart: state.cart,
      total: state.totalPrice,
      paid,
      kembali: kemb,
    };
    addDaily(confirm);
    setPaid('0');
    setOpen(prevState => {
      return !prevState;
    });
  };

  return (
    <>
      <Modal open={open} setOpen={setOpen} />
      <div className="flex h-full bg-gray-100">
        <div className="w-1/3">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-9/12 text-lg">
              <div className="flex justify-between">
                <div>Total</div>
                <div>{state.totalPrice}</div>
              </div>
              <div className="flex justify-between">
                <div>Bayar</div>
                <div>{paid}</div>
              </div>
              <div className="flex justify-between">
                <div>Kembalian</div>
                <div>{kemb}</div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex">
                <button
                  className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
                  value="7"
                  onClick={handlePaid}
                >
                  7
                </button>
                <button
                  className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
                  value="8"
                  onClick={handlePaid}
                >
                  8
                </button>
                <button
                  className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
                  value="9"
                  onClick={handlePaid}
                >
                  9
                </button>
              </div>
              <div className="flex">
                <button
                  className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
                  value="4"
                  onClick={handlePaid}
                >
                  4
                </button>
                <button
                  className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
                  value="5"
                  onClick={handlePaid}
                >
                  5
                </button>
                <button
                  className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
                  value="6"
                  onClick={handlePaid}
                >
                  6
                </button>
              </div>
              <div className="flex">
                <button
                  className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
                  value="1"
                  onClick={handlePaid}
                >
                  1
                </button>
                <button
                  className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
                  value="2"
                  onClick={handlePaid}
                >
                  2
                </button>
                <button
                  className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
                  value="3"
                  onClick={handlePaid}
                >
                  3
                </button>
              </div>
              <div className="flex">
                <button
                  className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
                  value="0"
                  onClick={handlePaid}
                >
                  0
                </button>
                <button
                  className="w-20 h-16 bg-gray-400 border hover:bg-gray-600 focus:outline-none"
                  value="00"
                  onClick={handlePaid}
                >
                  00
                </button>
                <button
                  className="w-20 h-16 bg-red-400 border hover:bg-red-600 focus:outline-none"
                  onClick={clearOne}
                >
                  C
                </button>
              </div>
              <button
                className="w-full p-2 mt-2 bg-green-400 hover:bg-green-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/3 h-full bg-gray-500">
          <div className="m-8">
            <div className="text-xl font-bold">Details</div>
            <div className="flex flex-col">
              <div className="flex text-sm font-bold text-left break-words">
                <div className="w-8">No .</div>
                <div className="w-1/5">Name</div>
                <div className="w-20">Type</div>
                <div className="w-1/2">Description</div>
                <div className="w-12 text-center">Price</div>
                <div className="w-20 text-center">Quantity</div>
                <div className="w-20 text-center">Total Price</div>
              </div>
            </div>
            {state.cart.map((item, index) => (
              <div key={item.title} className="flex flex-col">
                <div className="flex break-words text-sm text-left">
                  <div className="w-8">{index + 1}.</div>
                  <div className="w-1/5">{item.title}</div>
                  <div className="w-20">{item.type}</div>
                  <div className="w-1/2">{item.description}</div>
                  <div className="w-12 text-center">{item.price}</div>
                  <div className="w-20 text-center">{item.quantity}</div>
                  <div className="w-20 text-center">
                    {item['total-price'] ? item['total-price'] : item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

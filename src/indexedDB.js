/* eslint-disable default-case */
/* eslint-disable no-fallthrough */
import { openDB } from 'idb';
import Product from './data';

const init = async () => {
  const idb = await openDB('test', 3, {
    upgrade(db, oldVersion) {
      switch (oldVersion) {
        case 0:
        case 1: {
          const objStore = db.createObjectStore('items', {
            keyPath: 'title',
          });
          const tx = objStore.transaction;
          const { store } = tx;
          Product.map(value => store.add(value));
        }
        case 2:
          db.createObjectStore('daily', { keyPath: 'date' });
      }
    },
  });

  const getAllItem = async () => {
    const items = await idb.getAll('items');
    return items;
  };

  const getAllDailySales = async () => {
    const daily = await idb.getAll('daily');
    return daily;
  };

  const addDialySales = async date => {
    const tx = idb.transaction('daily', 'readwrite');
    tx.store.add(date);
    await tx.done;
  };

  const clearDailySales = async () => {
    const tx = idb.clear('daily');
    await tx.done;
  };

  return {
    getAllItem,
    getAllDailySales,
    addDialySales,
    clearDailySales,
  };
};

export default init;

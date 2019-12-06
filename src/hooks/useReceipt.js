import { useEffect, useState } from 'react';
import idb from '../indexedDB';

const useReciept = () => {
  const [item, setItem] = useState([]);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    if (!window.indexedDB) {
      window.alert(
        "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.",
      );
    }
    const requestAllItem = async () => {
      const db = await idb();
      db.getAllItem().then(data => setItem(data));
      db.getAllDailySales().then(data => setDaily(data));
    };
    requestAllItem();
  }, []);

  const addDaily = async input => {
    const db = await idb();
    db.addDialySales(input);
  };

  const clearDaily = async () => {
    const db = await idb();
    db.clearDailySales();
  };

  return { item, daily, addDaily, clearDaily };
};

export default useReciept;

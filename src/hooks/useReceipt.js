import { useEffect, useState } from 'react';
import idb from '../indexedDB';

const useIndexedDB = () => {
  const [item, setItem] = useState([]);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
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
    setDaily(preveState => {
      return [...preveState, input];
    });
  };

  return { item, daily, addDaily };
};

export default useIndexedDB;

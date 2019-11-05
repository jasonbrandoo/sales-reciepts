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

  const addDaily = async date => {
    const db = await idb();
    db.addDialySales(date);
    setDaily(preveState => {
      return [...preveState, date];
    });
  };

  // useEffect(() => {
  //   /**
  //    * check if browser support IndexedDB
  //    */
  //   if (!('indexedDB' in window)) {
  //     alert("Your browser doesn't support IndexedDB");
  //     return;
  //   }

  //   /**
  //    * open IndexedDB
  //    * @returns request
  //    */
  //   const request = indexedDB.open('test', 3);

  //   /**
  //    * Request IndexedDB on success
  //    * @returns cursor
  //    */
  //   request.onsuccess = event => {
  //     db.current = event.target.result;
  //     const itemStore = db.current.transaction('items').objectStore('items');
  //     const dailyStore = db.current.transaction('daily').objectStore('daily');
  //     itemStore.openCursor().onsuccess = eventCursor => {
  //       const cursor = eventCursor.target.result;
  //       if (cursor) {
  //         dispatch({ type: 'GET_ALL_ITEM', payload: cursor.value });
  //         cursor.continue();
  //       }
  //     };
  //     dailyStore.openCursor().onsuccess = eventCursor => {
  //       const cursor = eventCursor.target.result;
  //       if (cursor) {
  //         dispatch({ type: 'ADD_DAILY', payload: cursor.value });
  //         console.log('run2');
  //         cursor.continue();
  //       }
  //     };
  //   };

  //   /**
  //    * request IndexedDB on upgrade needed
  //    * @returns objectStore
  //    */
  //   request.onupgradeneeded = event => {
  //     db.current = event.target.result;
  //     switch (event.oldVersion) {
  //       case 0:
  //       case 1: {
  //         const objectStore = db.current.createObjectStore('items', {
  //           keyPath: 'title',
  //         });
  //         objectStore.transaction.oncomplete = () => {
  //           const tx = db.current.transaction('items', 'readwrite');
  //           const store = tx.objectStore('items');
  //           Product.map(item => store.add(item));
  //         };
  //       }
  //       case 2:
  //         db.current.createObjectStore('daily', { keyPath: 'date' });
  //         break;
  //       default:
  //         throw new Error();
  //     }
  //   };

  //   /**
  //    * request IndexedDB on error
  //    * @returns error
  //    */
  //   request.onerror = () => alert('Cannot open database');
  // }, [dispatch]);
  return { item, daily, addDaily };
};

export default useIndexedDB;

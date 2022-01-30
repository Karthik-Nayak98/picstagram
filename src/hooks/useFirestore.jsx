import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";

import { db } from "../firebase/firebase";

function useFirestore(collectionName) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      setData(
        snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
    return () => unsubscribe();
  }, [collectionName]);
  return data;
}

export default useFirestore;

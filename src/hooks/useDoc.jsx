import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";

import { db } from "../firebase/firebase";

function useDoc(collectionName, uid = "") {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, collectionName), where("uid", "==", uid));
    const unsubscribe = onSnapshot(q, snapshot => {
      setData(
        snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
    return () => unsubscribe();
  }, [collectionName, uid]);
  return data;
}

export default useDoc;

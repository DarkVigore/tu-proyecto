import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";

export const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, collectionName));
    const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setData(items);
    setLoading(false);
  };

  const addItem = async (item) => {
    await addDoc(collection(db, collectionName), item);
    fetchData();
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, collectionName, id));
    fetchData();
  };

  const editItem = async (id, updatedItem) => {
    await updateDoc(doc(db, collectionName, id), updatedItem);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, addItem, deleteItem, editItem, fetchData };
};

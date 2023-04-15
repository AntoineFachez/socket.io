// import React, { useContext } from "react";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "./firebase";
// import AppContext from "../context/AppContext";

const StoreToFirestore = ({ dataPack }) => {
  console.log(dataPack);
  // const { setChatInFocusId } = useContext(AppContext);
  const firestoreContext = dataPack.firestoreContext;
  const data = dataPack.data;
  const setElementInFocus = dataPack.setElementInFocus;
  const handleStoreToFirestore = async () => {
    // Add a new document in collection "cities"
    const docRef = await addDoc(collection(db, firestoreContext), data);
    console.log("Document written with ID: ", docRef.id);

    const docSnap = await getDoc(doc(db, firestoreContext, docRef.id));

    if (docSnap.exists()) {
      console.log(docSnap.data());
      setElementInFocus(docSnap.data(), docRef.id);
      // setInFocus(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  handleStoreToFirestore();
};

export default StoreToFirestore;

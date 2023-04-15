import React, { useContext, useEffect, useState } from "react";

// import { Box, Button, TextField } from "@material-ui/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
// import { AppState } from "../contexts/AppContext";
import AppContext, { AppState } from "../../context/AppContext";
import { auth, db } from "../../firebase/firebase";
import "./log-in.css";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
// import { AiOutlineConsoleSql } from "react-icons/ai";

const LogOut = () => {
  const { setWelcome, logId, setLogId, user, userInFocus, setUserInFocus } =
    useContext(AppContext);
  // const { user, userInFocus, setUserInFocus } = AppState();
  const [loggedOut, setLoggedOut] = useState(false);
  const { setAlert, setUser } = AppState();

  const logOut = async () => {
    const firebaseContext = "users";
    console.log(userInFocus);

    const data = {
      logsFrontEnd: arrayUnion({
        logOut: new Date().getTime(),
        logOut2: new Date(),
      }),
    };
    signOut(auth);

    // let logToUpdate = user.logsFrontEnd.filter(
    //   (version) => version.logId === logId
    // );
    // console.log(logToUpdate);
    // const id = user.userUid;
    // const q = query(collection(db, "users"), where("userUid", "==", id));
    // const querySnapshot = await getDocs(q);
    // let uid;
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   // console.log(doc.id, " => ", doc.data());
    //   uid = doc.id;
    // });
    // const newLogInRef = doc(db, "users", uid);
    // await updateDoc(newLogInRef, data);

    // const docSnap = await getDoc(newLogInRef);

    // // setLoggedInProcess(false);

    // data.treatmentVersions.push(logToUpdate[0]);
    // console.log(data);

    console.log(user);
    // const id = user.id;
    // const updateLogRef = doc(db, firebaseContext, id);
    // await updateDoc(updateLogRef, data);

    console.log(user);
    setUser(null);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });
  };
  const updateUser = async (user) => {
    // console.log("clicked");
    //  const handlePublishTreatment = async (treatment) => {

    // let data = {};

    const data = {
      logsFrontEnd: arrayUnion({
        logOut: new Date().getTime(),
        logOut2: new Date(),
      }),
    };

    const id = user.uid;
    // console.log(id);
    const q = query(collection(db, "users"), where("userUid", "==", id));
    const querySnapshot = await getDocs(q);
    let uid;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      uid = doc.id;
    });
    const newLogInRef = doc(db, "users", uid);
    await updateDoc(newLogInRef, data);

    const docSnap = await getDoc(newLogInRef);

    if (docSnap.exists()) {
      setUserInFocus({
        id: id,
        lastLogIn: data,
        user: docSnap.data(),
      });
    } else {
      console.log("No such document!");
    }
    //  };
  };

  return (
    <div
    //  className="logOut"
    >
      {user && <div onClick={logOut}>Log Out</div>}
    </div>
  );
};

export default LogOut;

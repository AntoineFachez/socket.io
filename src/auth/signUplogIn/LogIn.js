import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { FormControl, Input, Button, TextField } from "@material-ui/core";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { signOut } from "firebase/auth";
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

const Login = ({ handleClose, switchToSignUp }) => {
  const { setUser, userUid, setUserUid, alert, setAlert } = AppState();
  const [loggedIn, setLoggedIn] = useState(false);
  const { logId, setLogId, user, setUserInFocus } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    // e.preventDefautl();
    if (!email || !password) {
      setAlert({
        open: true,
        message: "fill in email and password",
        type: "error",
      });
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user.emailVerified) {
        const logId = uuidv4();
        setLogId(logId);
        const data = {
          logsFrontEnd: arrayUnion({
            logIn: new Date().getTime(),
            logIn2: new Date(),
            logId: logId,
          }),
        };

        const id = userCredential.user.uid;
        // console.log(id);
        // console.log(userCredential.user.uid);
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
        // setLoggedInProcess(false);
        setUser(docSnap.data());
        // console.log(user);
        if (docSnap.exists()) {
          // setUserInFocus({
          //   id: id,
          //   lastLogIn: data,
          //   user: docSnap.data(),
          // });
          // setLoggedInProcess(false);
        } else {
          console.log("No such document!");
        }

        setAlert({
          open: true,
          message: `welcome ${userCredential.user.email}`,
          type: "success",
        });
      } else {
        setAlert({
          open: true,
          message: `please check your emails before proceeding`,
          type: "success",
        });
      }
      // window.localStorage.setItem(JSON.stringify("userLogin", userCredential));
      // localStorage.clear();
      // window.localStorage.clear();
    } catch (error) {
      console.log("error", error);
      // setAlert({
      //   open: true,
      //   message: error.message,
      //   type: "error",
      // });
      return;
    }
  };

  // console.log(user);

  // useEffect(() => {
  //   // console.log(user);
  //   // console.log(user);
  //   // console.log(user);
  // }, [loggedIn]);
  return (
    <div
      className="input-container"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      //  onSubmit={(e) => handleSubmit(e)}
    >
      <input
        className="input-signUp-LogIn"
        placeholder="email"
        type="email"
        label="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        // fullWidth
      />
      <input
        className="input-signUp-LogIn"
        placeholder="password"
        type="password"
        label="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // fullWidth
      />

      <div className="form-footer">
        <p className="signUp-logIn-message">{alert?.message}</p>
        {email && password ? (
          <button
            className="signUp-login-btn"
            // style={{ backgroundColor: "grey" }}
            onClick={handleSubmit}
            variant="contained"
          >
            Log In
          </button>
        ) : (
          <button
            className="switch-signUp-login-btn"
            onClick={switchToSignUp}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            no account yet ?
          </button>
        )}
      </div>
      {/* )} */}
      {/* {user ? null : (
        <button className="signUp-login-btn" onClick={logOut}>
          Log Out
        </button>
      )} */}
    </div>
  );
};

export default Login;

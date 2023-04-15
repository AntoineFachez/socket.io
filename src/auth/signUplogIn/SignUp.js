import React from "react";
import { auth, db } from "../../firebase/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FormControl, Input, Button, TextField } from "@mui/material";
import { useState } from "react";
// import { Snackbar } from '@material-ui/core';
import { AppState } from "../../context/AppContext";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendSignInLinkToEmail,
} from "firebase/auth";
// import { app, db, storage } from "../../firebase/firebase-config";

import "./log-in.css";
import { Firestore } from "firebase/firestore";

const Signup = ({ handleClose, switchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("viewer");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [alert, setAlert] = useState("");
  const { user, alert, setAlert } = AppState();
  const firebaseContext = "users";

  const create = async (user) => {
    console.log("user:", user.uid);

    const data = {
      userUid: user.uid,
      userRole: userRole,
      userMail: email,
    };

    const newRef = doc(collection(db, firebaseContext));
    await setDoc(newRef, data);

    const newUserNotifictationMail = {
      to: "anthony@p00l.tv",
      message: {
        subject: "StarDust Hotel!",
        html: `Hey Sebo, a user with the verified email ${email} just logged in.`,
      },
    };

    const newUserNotificationRef = doc(collection(db, "newUserNotification"));
    await setDoc(newUserNotificationRef, newUserNotifictationMail);

    console.log(data);
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }
    if (!email || !password) {
      setAlert({
        open: true,
        message: "fill in email and password",
        type: "error",
      });
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then(async function (userCredential) {
          var user = userCredential.user;
          create(user);

          user.reload();

          sendEmailVerification(user);
          setAlert({
            open: true,
            message: `please check your mails`,
            type: "success",
          });
          // sendSignInLinkToEmail(user);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });

      setAlert({
        open: true,
        message: `sign up successfull. Welcome ${userCredential.user.email}`,
        type: "success",
      });
      handleClose();
      return userCredential;
    } catch (error) {
      console.log(error);
      // setAlert({
      //   open: true,
      //   message: error.message,
      //   type: "error",
      // });
      return;
    }
  };
  return (
    <FormControl className="input-container">
      <input
        className="input-signUp-LogIn"
        placeholder="email"
        type="email"
        label="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        // fullWidth
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   color: "#fff",
        // }}
      />
      <input
        className="input-signUp-LogIn"
        placeholder="password"
        type="password"
        label="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="input-signUp-LogIn"
        placeholder="password confirmation"
        type="password"
        label="confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="form-footer">
        <p className="signUp-logIn-message">{alert.message}</p>
        {email && password && confirmPassword ? (
          <button
            className="signUp-login-btn"
            // style={{ backgroundColor: "#EEBC1D" }}
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        ) : (
          <button
            className="switch-signUp-login-btn"
            onClick={switchToSignUp}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            already an account ?
          </button>
        )}
      </div>
    </FormControl>
  );
};

export default Signup;

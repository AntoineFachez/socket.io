import React, { useEffect, useState } from "react";
// import { FormControl, Input, Button, TextField } from "@material-ui/core";
// import { SubmitButton } from "../../components/button/Button";
import CachedIcon from "@mui/icons-material/Cached";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import { AppState } from "../../context/AppContext";
import "./log-in.css";

function Index({}) {
  const { user, setWelcome, alert, setAlert } = AppState();
  const [showSignUp, setShowSignUp] = useState(false);
  const switchToSignUp = () => {
    if (!showSignUp) {
      setAlert("");
      setShowSignUp(true);
    } else {
      setAlert("");
      setShowSignUp(false);
    }
  };
  useEffect(() => {
    setWelcome(true);
  }, [user]);

  return (
    <>
      <div
        className="signUp-logIn"
        style={
          {
            // position: "absolute",
            // top: 0,
            // right: 0,
            // width: "15rem",
            // height: "15rem",
          }
        }
        // style={{ position: "relative" }}
      >
        {!user ? (
          <div style={{ width: "15rem", height: "15rem" }}>
            {showSignUp ? (
              <>
                <SignUp switchToSignUp={switchToSignUp} />
              </>
            ) : (
              <>
                <>
                  <LogIn switchToSignUp={switchToSignUp} />
                </>
              </>
            )}
          </div>
        ) : (
          <div>
            <LogOut />
          </div>
        )}
      </div>
    </>
  );
}

export default Index;

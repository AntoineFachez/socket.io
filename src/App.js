import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const socket = io.connect("http://localhost:3001");

function App() {
  // const [message, setMessage] = useState({
  //   component: "App",
  //   message: "clicked send message",
  //   action: "deliver message",
  //   user: "admin",
  // });
  const [messages, setMessages] = useState([]);
  const [logInMessage, setLogInMessage] = useState({
    component: "App",
    message: "",
    action: "deliver message",
    userId: uuidv4(),
    userEmail: "anthony.zornig@gmx.de",
    userName: "admin",
  });
  const [message, setMessage] = useState({
    component: "App",
    message: "",
    action: "deliver message",
    userId: uuidv4(),
    userEmail: "anthony.zornig@gmx.de",
    userName: "admin",
  });

  const sendMessage = () => {
    socket.emit("msg_from_client", message);
    socket.on("message_delivered", (data) => {
      console.log(`Server delivered: ${data.message}`);
    });
    messages.push(message);
    // socket.emit("msgFromClient", { message: "Hello, world!" });
  };
  const handleChangeInput = (e) => {
    setMessage({ ...message, message: e.target.value });
  };
  const [messgesObject, setMessgesObject] = useState();

  const handelMessages = () => {};
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("user_connected", logInMessage);
    });

    socket.on("msg_from_server", (data) => {
      messages.push(data);
      console.log(data);
    });
    return () => {
      setMessgesObject(
        <>
          {messages?.map((message, i) => {
            return <div key={i}>{message.message}</div>;
          })}
        </>
      );
    };
  }, [socket, messages, logInMessage]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <input
            placeholder="Message..."
            // value="this is from a user"
            onChange={(e) => handleChangeInput(e)}
          />
          <button onClick={sendMessage}>send message</button>
        </p>
        {messgesObject}
      </header>
    </div>
  );
}

export default App;

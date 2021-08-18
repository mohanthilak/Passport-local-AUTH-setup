import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [registerUsername, setRegisterUsername] = useState();
  const [registerPassword, setRegisterPassword] = useState();
  const [loginUsername, setLoginUsername] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [printUsername, setPrintUsername] = useState("");

  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => {
      console.log(res);
    });
  };
  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => {
      console.log(res);
    });
  };
  const getUser = () => {
    axios({
      method: "GET",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {
      if (res.data && res.data.username) {
        setPrintUsername(res.data.username);
      }
    });
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setRegisterUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        />
        <button onClick={register}>Submit</button>
      </div>
      <div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setLoginUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button onClick={login}>Submit</button>
      </div>
      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        <h2>{printUsername ? `Hello ${printUsername}` : ""}</h2>
      </div>
    </div>
  );
}

export default App;

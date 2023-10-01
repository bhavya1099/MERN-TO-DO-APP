import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CredentialsContext from "../context/notes/credentialsContext.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { creds, setCreds } = useContext(CredentialsContext);
  const history = useNavigate();

  const handleErrors = async (res) => {
    console.log("response", res);
    if (!res.ok) {
      const message = await res.json();
      throw Error(message);
    }
    return res.json();
  };

  const register = (e) => {
    e.preventDefault();
    console.log("hey there");

    fetch("http://localhost:2000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        return handleErrors(res);
      })
      .then(() => {
        history("/todo");
      })
      .catch((err) => {
        console.log("err message", err);
        toast("User already exists !");
      });
  };

  return (
    <>
      <div style={{ textAlign: "center", fontSize: "25px", marginTop: "18px" }}>
        Sign Up!
      </div>
      <ToastContainer />
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
            setCreds({ ...creds, username: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setCreds({ ...creds, password: e.target.value });
          }}
        />
        <button type="submit">Sign Up</button>
      </form>

      <div className="footerText">Already a member, Login here!</div>
      <div className="footerBtn">
        <button className="loginBtn" onClick={() => history("/login")}>
          Login
        </button>
      </div>
    </>
  );
}
export default Register;

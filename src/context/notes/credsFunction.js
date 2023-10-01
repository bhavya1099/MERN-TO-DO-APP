import CredentialsContext from "./credentialsContext.js";
import { react, useState } from "react";

function CredsFunction(props) {
  const obj = "hello";
  const [creds, setCreds] = useState({ username: "", password: "" });

  return (
    <CredentialsContext.Provider value={{ creds, setCreds }}>
      {props.children}
    </CredentialsContext.Provider>
  );
}

export default CredsFunction;

import { React, useContext, useEffect } from "react";
import "./todo.css";
import CredentialsContext from "../context/notes/credentialsContext.js";
import { v4 as uuidv4 } from "uuid";
import plusIcon from "../assets/svgs/plus-icon.svg";

function Form({
  setInputText,
  todos,
  setTodos,
  inputText,
  setStatus,
  setFilteredTodos,
  filteredTodos,
}) {
  // In here we can write our javascript code and function.
  const { creds } = useContext(CredentialsContext);

  const persist = (newTodos) => {
    console.log("new todos", newTodos);
    fetch("http://localhost:2000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${creds.username}:${creds.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then({});
  };

  // useEffect(() => {
  //   console.log("called post also");
  //   fetch("http://localhost:2000/todos", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Basic ${creds.username}:${creds.password}`,
  //     },
  //     body: JSON.stringify(todos),
  //   }).then({});
  // }, [todos]);

  const inputTextHandler = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };
  //to not to refresh the page.
  const submitTodoHandler = (e) => {
    e.preventDefault(); //to prevent app from reseting everything, once we click on the submit button.
    console.log("time", inputText, todos);
    if (inputText) {
      const xx = todos;
      const pp = filteredTodos;
      xx.push({
        //id: uuidv4(),
        text: inputText,
        completed: false /*id: Math.random() * 1000*/,
      });
      pp.push({
        //id: uuidv4(),
        text: inputText,
        completed: false /*id: Math.random() * 1000*/,
      });
      setTodos(xx);
      setFilteredTodos(pp);
      persist(xx);
    }
    setInputText(""); //to reset the form after hitting the submit button.
  };

  return (
    <form>
      <input
        onChange={inputTextHandler}
        value={inputText}
        type="text"
        className="todo-input"
      />
      <button onClick={submitTodoHandler} className="todo-button" type="submit">
        {/* <i className="fas fa-plus-circle" style={{ width: "22px" }}></i> */}
        <img src={plusIcon} width={"25px"} />
      </button>
    </form>
  );
}
export default Form;

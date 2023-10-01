import { React, useContext } from "react";
import CredentialsContext from "../../context/notes/credentialsContext.js";
import "../todo.css";
import tickIcon from "../../assets/svgs/tick-icon.png";
import deleteIcon from "../../assets/svgs/delete-icon.png";
import _ from "lodash";

const Todo = ({
  text,
  todo,
  todos,
  setTodos,
  filteredTodos,
  setFilteredTodos,
}) => {
  const { creds } = useContext(CredentialsContext);
  const persist = (newTodos) => {
    fetch("http://localhost:2000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${creds.username}:${creds.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then({});
  };

  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.text !== todo.text));
    setFilteredTodos(todos.filter((el) => el.text !== todo.text));
    const newTodos = todos.filter((el) => el.text !== todo.text);
    persist(newTodos);
  };
  console.log("bhavya", todos);
  const completeHandler = () => {
    let tempTodos = _.cloneDeep(todos);
    let filterTodos = _.cloneDeep(filteredTodos);
    tempTodos = todos.map((item) => {
      if (item.text === todo.text) {
        console.log("todo id", todo.id);
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });
    filterTodos = filteredTodos.map((item) => {
      if (item.text === todo.text) {
        console.log("todo id", todo.id);
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });
    console.log("temp todos", tempTodos);
    setTodos(tempTodos);
    setFilteredTodos(filterTodos);

    const newTodos = todos.map((item) => {
      if (item.text === todo.text) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });
    console.log("new todos", newTodos);
    persist(newTodos);
  };
  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {text}
      </li>
      <button className="complete-btn" onClick={completeHandler}>
        <img src={tickIcon} width={"25px"} />
      </button>
      <button className="trash-btn" onClick={deleteHandler}>
        <img
          // className="complete-btn"
          src={deleteIcon}
          width={"22px"}
        />
      </button>
    </div>
  );
};
export default Todo;

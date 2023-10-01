import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import TodoList from "./TodoList";
import Todo from "./Todo/index.js";
import CredentialsContext from "../context/notes/credentialsContext.js";

function Home() {
  const [inputText, setInputText] = useState(""); // To Get the data from the user, then change that into states.
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [status, setStatus] = useState("all"); //state for filtering items by clicking on 'all','completed' and 'uncompleted'.
  const { creds } = useContext(CredentialsContext);
  const navigate = useNavigate();
  const handleErrors = async (res) => {
    console.log("response", res);
    if (!res.ok) {
      const message = await res.json();
      console.log(message);
      throw Error(message.message);
    }

    return res.json();
  };
  useEffect(() => {
    fetch("http://localhost:2000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${creds.username}:${creds.password}`,
      },
    })
      .then(handleErrors)
      .then((todos) => {
        console.log("todos res", todos);
        setTodos(todos);
        setFilteredTodos(todos);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    filterHandler();
  }, [status]);

  console.log("todos in home page", todos);
  const statusHandler = (e) => {
    setStatus(e.target.value); //to update our state whenever we click
  };
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  // SAVE TO LOCAL
  // const saveLocalTodos = () => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // };
  // const getLocalTodos = () => {
  //   if (localStorage.getItem("todos") === null) {
  //     localStorage.setItem("todos", JSON.stringify([]));
  //   } else {
  //     let todoLocal = JSON.parse(localStorage.getItem("todos"));
  //     //  console.log(todoLocal);
  //     setTodos(todoLocal);
  //   }
  // };
  //USE EFFECT
  // useEffect(() => {
  //   getLocalTodos();
  // }, []);
  // useEffect(() => {
  //   filterHandler();
  //   //saveLocalTodos();
  // }, [todos, status]);
  return (
    <>
      <button
        className="logoutBtn"
        onClick={() => {
          console.log("clicked");
          navigate("/login");
        }}
      >
        Log out
      </button>
      <header>
        <h1>{creds.username}'s To do List!! </h1>
      </header>

      <div className="formContainer">
        <Form
          setStatus={setStatus}
          setTodos={setTodos}
          todos={todos}
          inputText={inputText}
          setInputText={setInputText}
          setFilteredTodos={setFilteredTodos}
          filteredTodos={filteredTodos}
        />
        <div className="select">
          <select onChange={statusHandler} name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </div>
      {/* <TodoList
        //filteredTodos={filteredTodos}
        todos={todos}
        setTodos={setTodos}
      /> */}
      <div className="todos">
        <div className="todo-container">
          {/* <ul className="todo-list"></ul> */}
          {filteredTodos !== null ? (
            filteredTodos.map((todo) => (
              <Todo
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                text={todo.text}
                key={todo.id}
                setFilteredTodos={setFilteredTodos}
                filteredTodos={filteredTodos}
              />
            ))
          ) : (
            <div>No to do item</div>
          )}
        </div>
      </div>
    </>
  );
}
export default Home;

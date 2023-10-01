import React from "react";
import Todo from "./Todo/index.js";
import "./todo.css";
function TodoList({ todos, setTodos, filteredTodos }) {
  console.log(todos);
  return (
    <div>
      <div className="todo-container">
        <ul className="todo-list"></ul>
        {todos !== undefined ? (
          todos.map((todo) => (
            <Todo
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              text={todo.text}
              key={todo.id}
            />
          ))
        ) : (
          <div>No to do item</div>
        )}
      </div>
    </div>
  );
}

export default TodoList;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import todos from "./reducers/addTodo";
import visibilityFilter from "./reducers/visibilityFilter";
import getVisibleTodos from "./reducers/getVisibleTodos";
import { setFilter, addTodo, toggleTodo } from "./actions";
import "./index.css";

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp);

const FilterLink = ({ filter, currentFilter, onClick, children }) => {
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick(filter);
      }}
    >
      {children}
    </a>
  );
};

const AddTodo = ({ onKeyPress, onAddClick }) => (
  <div className="form-group">
    <input
      ref={node => {
        this.input = node;
      }}
      onKeyPress={e => {
        if (e.key === "Enter") {
          onKeyPress(this.input.value);
          e.target.value = "";
        }
      }}
    />
    <button
      onClick={() => {
        onAddClick(this.input.value);
        this.input.value = "";
      }}
    >
      Add
    </button>
  </div>
);

const Todo = ({ completed, id, text, onClick }) => (
  <li className={`todo ${completed ? "todo--completed" : ""}`}>
    <input type="checkbox" checked={completed} onChange={onClick} />
    <label>{text}</label>
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, idx) => (
      <Todo key={idx} onClick={() => onTodoClick(todo.id)} {...todo} />
    ))}
  </ul>
);

const Footer = ({ visibilityFilter, onFilterClick }) => (
  <div>
    <span>Filter:</span>{" "}
    <FilterLink
      filter="SHOW_ALL"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      All
    </FilterLink>{" "}
    <FilterLink
      filter="SHOW_COMPLETED"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Completed
    </FilterLink>{" "}
    <FilterLink
      filter="SHOW_ACTIVE"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Active
    </FilterLink>
  </div>
);

const TodoApp = ({ todos, visibilityFilter }) => (
  <div>
    <AddTodo
      onAddClick={text => store.dispatch(addTodo(text))}
      onKeyPress={text => store.dispatch(addTodo(text))}
    />
    <TodoList
      todos={getVisibleTodos(todos, visibilityFilter)}
      onTodoClick={id => store.dispatch(toggleTodo(id))}
    />
    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={filter => {
        store.dispatch(setFilter(filter));
      }}
    />
  </div>
);

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById("root")
  );
};

store.subscribe(render);
render();

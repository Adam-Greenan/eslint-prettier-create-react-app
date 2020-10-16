import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';
import * as classes from './TodoList.module.css'
import Todo from './Todo/Todo';

const TodoList = (props) => {
    const [newTodo, setNewTodo] = useState('')
  console.log(props.TodoList);

  if (!props.TodoList.todos) {
    return <div>Add some todos</div>;
  }

  const Todos = props.TodoList.todos.map((todo) => {
    return <Todo todo={{ ...todo }} />;
  });
  return (
    <div className={classes.cont}>
    
      <h1>{props.TodoList.title}</h1>
      {Todos}
    </div>
  );
};

export default TodoList;

import React from 'react';
import * as classes from './Todo.module.css'
const Todo = (props) => {
  return (
    <div className={classes.cont}>
      <h3>{props.todo.title} </h3> <p>{props.todo.time} Day</p>
    </div>
  );
};

export default Todo;

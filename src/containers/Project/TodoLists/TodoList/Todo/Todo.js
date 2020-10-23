import React from 'react';
import * as classes from './Todo.module.css';
import { Button } from 'semantic-ui-react';

const Todo = (props) => {
  return (
    <div className={classes.cont}>
      <Button
        onClick={() => props.handleDeleteTodo(props.uid)}
        icon="delete"
        floated={'right'}
      />
      <h3>{props.todo.title} </h3> <p>{props.todo.time} Day</p>
      <p>Dependent on: {props.todo.seqData}</p>
    </div>
  );
};

export default Todo;

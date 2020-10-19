import React, { useState, useEffect } from 'react';
import { Button, Input, Container } from 'semantic-ui-react';
import * as classes from './TodoList.module.css';
import RemoveTodoListModal from '../../../../components/modals/RemoveTodoListModal';
import Todo from './Todo/Todo';

const TodoList = (props) => {
  const [newTodo, setNewTodo] = useState({ title: '', time: '' });
  const [showCreateNewTodo, setShowCreateNewTodo] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [completeTime, setCompleteTime] = useState(0);

  useEffect(() => {
    calcTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.TodoList]);

  const calcTime = () => {
    let time = 0;
    props.TodoList.todos.map((todo) => {
      time = time + +todo.time;
      return null;
    });
    setCompleteTime(time);
  };

  const handleDeleteTodoList = () => {
    setShowDeleteModal(false);
    props.deleteTodoList(props.TodoList.title);
  };

  if (!props.TodoList.todos) {
    return <div>Add some todos</div>;
  }
  const currentTodos = props.TodoList.todos
  const handleAddTodo = () => {
    currentTodos.push(newTodo);
    props.updateTodos(props.TodoList.title, currentTodos);
  };

  
  const Todos = props.TodoList.todos.map((todo) => {
    return <Todo key={todo.title} todo={{ ...todo }} />;
  });
  return (
    <div className={classes.cont}>
      <Button
        onClick={() => setShowDeleteModal(true)}
        negative
        icon="delete"
        floated={'right'}
      />
      <br />
      <h1>{props.TodoList.title}</h1>
      {props.TodoList.dependent !== 'None' ? (
        <p>
          This stage can be commenced once the <br />
          <b>{props.TodoList.dependent}</b>
          <br /> stage is completed
        </p>
      ) : (
        <p>This stage can be developed independently of others.</p>
      )}
      {showCreateNewTodo ? (
        <Container>
          <Input
            label="Todo"
            placeholder="Write Todo here..."
            onChange={(e) =>
              setNewTodo({ ...newTodo, title: e.target.value })
            }
          />
          <br />
          <Input
            label={{ basic: true, content: 'days' }}
            labelPosition="right"
            placeholder="Enter est. days"
            onChange={(e) =>
              setNewTodo({ ...newTodo, time: e.target.value })
            }
          />
          <br />
          <br />
          <Button onClick={() => handleAddTodo()} positive>
            Add
          </Button>
        </Container>
      ) : (
        <Button
          circular
          icon="write square"
          floated="left"
          onClick={() => setShowCreateNewTodo(true)}
        />
      )}

      <br />
      {Todos}

      <p>Time to complete: {completeTime} days</p>
      <RemoveTodoListModal
        open={showDeleteModal}
        handleDeleteTodoList={handleDeleteTodoList}
        setOpen={setShowDeleteModal}
      />
    </div>
  );
};

export default TodoList;

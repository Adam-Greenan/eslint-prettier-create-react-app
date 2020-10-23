import React, { useState, useEffect, useCallback } from 'react';
import { Button, Input, Container, Dropdown } from 'semantic-ui-react';
import * as classes from './TodoList.module.css';
import { v4 as uuid } from 'uuid';
import RemoveTodoListModal from '../../../../components/modals/RemoveTodoListModal';
import Todo from './Todo/Todo';

const TodoList = (props) => {
  const [newTodo, setNewTodo] = useState({ title: '', time: '', sequential: 0, seqData: '', });
  const [showCreateNewTodo, setShowCreateNewTodo] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [completeTime, setCompleteTime] = useState(0);
  const currentList = props.TodoList;
  const currentTodos = props.TodoList.todos;

  const updateTotalTime = useCallback(() => {
      currentList.totalTime = completeTime;
    }, [currentList, completeTime]);

  const calcTime = useCallback(() => {
    let time = 0;
    props.TodoList.todos.map((todo) => {
      time = time + +todo.time;
      return null;
    });
    setCompleteTime(time);
    updateTotalTime();
  }, [updateTotalTime, props.TodoList.todos]); 

  useEffect(() => {
    calcTime();
  }, [props.TodoList, calcTime]);

  const handleDeleteTodoList = () => {
    setShowDeleteModal(false);
    props.deleteTodoList(props.TodoList.title);
  };

  if (!props.TodoList.todos) {
    return <div>Add some todos</div>;
  }

  const handleAddTodo = () => {
    currentTodos.push({ ...newTodo, uid: uuid() });
    setNewTodo({ title: '', time: '', uid: uuid() });
    setShowCreateNewTodo(false);
    props.updateTodos(props.TodoList.title, currentTodos);
  };

  const handleDeleteTodo = (uid) => {
    const newTodos = currentTodos.filter((todo) => {
      return todo.uid !== uid;
    });
    props.updateTodos(props.TodoList.title, newTodos);
  };

  const todoListTitles = props.TodoList.todos.map(todo => {
    return todo.title
  })

  const depOptions = todoListTitles.map(title => {
    return {
      key: title,
      text: title,
      value: title,
      name: 'seqData'
    }
  })

  const dependentOptions = [
    {
      key: 'None',
      text: 'None',
      value: 'None',
      name: 'seqData'
    },
    ...depOptions
  ]

  const handleDependentChange = (text) => {
    let data = text
    let seq = 1
    if(data === 'None') {
      data = ''
      seq = 0
    }
    setNewTodo({...newTodo, sequential: seq, seqData: data})
  }

  const Todos = props.TodoList.todos.map((todo) => {
    return (
      <Todo
        handleDeleteTodo={handleDeleteTodo}
        key={todo.uid}
        uid={todo.uid}
        todo={{ ...todo }}
      />
    );
  });
  return (
    <div className={classes.cont}>
      {/* <Button onClick={() => updateTotalTime()} /> */}
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
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <br />
          <span>Which task is this dependent on?</span>
          <Dropdown
              inline
              options={dependentOptions}
              defaultValue={dependentOptions[0].value}
              name={'seqData'}
              onChange={(e) => handleDependentChange(e.target.textContent)}
            />
          <br />
          <Input
            label={{ basic: true, content: 'days' }}
            labelPosition="right"
            placeholder="Enter est. days"
            onChange={(e) => setNewTodo({ ...newTodo, time: e.target.value })}
          />
          <br />
          <br />
          <Button negative onClick={() => setShowCreateNewTodo(false)}>
            Close
          </Button>
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
      <RemoveTodoListModal
        open={showDeleteModal}
        handleDeleteTodoList={handleDeleteTodoList}
        setOpen={setShowDeleteModal}
      />
    </div>
  );
};

export default TodoList;

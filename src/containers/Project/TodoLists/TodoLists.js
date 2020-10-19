import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import TodoList from './TodoList/TodoList';
import {v4 as uuid} from 'uuid'
import CreateTodoListModal from '../../../components/modals/CreateTodoListModal';
import * as classes from './TodoLists.module.css';
import * as actionCreators from '../../../store/actions/index';

const TodoLists = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [newTodoList, setNewTodoList] = useState({
    title: '',
    dependent: 'None',
    todos: [{ title: '', time: '' }],
  });
  const { key } = props.project;

  const handleChange = (e) => {
    if (e.target.name === 'listTitle') {
      setNewTodoList({
        ...newTodoList,
        title: e.target.value,
      });
    } else {
      setNewTodoList({
        ...newTodoList,
        todos: [
          {
            ...newTodoList.todos[0],
            [e.target.name]: e.target.value,
          },
        ],
      });
    }
  };

  const handleDependentChange = (text) => {
      setNewTodoList({
          ...newTodoList,
          dependent: text
      })
  }

  const todoListsTitles = props.TodoLists.map(list => {
      return list.title
  })

  const currentTodos = props.TodoLists;

  const createTodoList = () => {
    currentTodos.push(newTodoList);
    props.updateTodos(key, currentTodos);
    setShowModal(false)
  };

  console.log(currentTodos)


  const handleUpdateTodos = (title, todos) => {
    
    const newTodos = currentTodos.map(List => {
        if(List.title === title) {
            List.todos = todos
        }
        return List

    })
    props.updateTodos(key, newTodos)

  }

  const handleDeleteTodoList = (title) => {
    const newTodos = currentTodos.filter(todo => {
          return todo.title !== title
      })
    props.updateTodos(key, newTodos)
  }


  const todoLists = props.TodoLists.map((List) => (
    <TodoList updateTodos={handleUpdateTodos} key={uuid()} deleteTodoList={handleDeleteTodoList} TodoList={{ ...List }} />
  ));
  return (
    <div className={classes.cont}>
      <h1>Todo Lists</h1>
      <Button primary onClick={() => setShowModal(true)}>
        Create Todo List
      </Button>
      <CreateTodoListModal
        setShowModal={setShowModal}
        showModal={showModal}
        handleChange={handleChange}
        todoListTitles={todoListsTitles}
        handleDependentChange={handleDependentChange}
        handleNewTodoList={createTodoList}
      />
      <br />
      {todoLists}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: state.projectReducer.currentProject,
    TodoLists: state.projectReducer.currentTodos,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateProjectProperty: (name, data, pr_name, path) =>
      dispatch(
        actionCreators.updateProjectPropertyInit(name, data, pr_name, path)
      ),
    updateTodos: (key, todos) =>
      dispatch(actionCreators.updateProjectTodosInit(key, todos)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoLists);

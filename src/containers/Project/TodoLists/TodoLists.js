import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';
import TodoList from './TodoList/TodoList';
import * as classes from './TodoLists.module.css'
import * as actionCreators from '../../../store/actions/index';

const TodoLists = (props) => {
  const [createInput, setCreateInput] = useState('');
  const { key, pr_name } = props.project;
  
  const createTodoList = () => {
    const object = {title: createInput};
    props.updateProjectProperty(key, object, pr_name);
  };

  const createTodo = (data) => {

  }

  console.log(props.todoLists);

  const todoLists = props.todoLists.map((List) => (
    <TodoList CreateTodo={createTodo} TodoList={{ ...List }} />
  ));
  return (
    <div className={classes.cont}>
      <h1>Todo Lists</h1>
      <Input
        icon="add square"
        iconPosition="left"
        placeholder="Add new Todo List"
        onChange={(e) => setCreateInput(e.target.value)}
      />
      <Button
        primary
        onClick={() => {
          createTodoList();
        }}
      >
        Create
      </Button>
      <br />
      {todoLists}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: state.projectReducer.currentProject,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateProjectProperty: (name, data, pr_name) =>
      dispatch(actionCreators.updateProjectPropertyInit(name, data, pr_name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoLists);

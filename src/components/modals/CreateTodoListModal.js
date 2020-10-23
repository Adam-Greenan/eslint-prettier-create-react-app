import React from 'react';
import { Modal, Input, Dropdown, Button } from 'semantic-ui-react';

const CreateTodoListModal = (props) => {
  const options = props.todoListTitles.map((title) => {
    return {
      key: title,
      text: title,
      value: title,
      name: 'dependent',
    };
  });

  const dependentOptions = [
    {
      key: 'None',
      text: 'None',
      value: 'None',
      name: 'dependent',
    },
    ...options,
  ];

  return (
    <div>
      <Modal
        data-testid={'modal'}
        size={'tiny'}
        open={props.showModal}
        onClose={() => props.setShowModal(false)}
      >
        <Modal.Header>Creating New Todo List</Modal.Header>
        <Modal.Content>
          <p>Please generate your Todo-List.</p>
          <Input
            icon="home"
            iconPosition="left"
            placeholder="New Todo-List Name"
            name="listTitle"
            onChange={props.handleChange}
          />
          <br />
          <br />
          <p>
            Does this todo list need to be developed specifically after any
            other list?
          </p>
          <span>
            TodoList Dependent on:{' '}
            <Dropdown
              data-testid={'dropdown'}
              inline
              options={dependentOptions}
              defaultValue={dependentOptions[0].value}
              name={'dependent'}
              onChange={(e) =>
                props.handleDependentChange(e.target.textContent)
              }
            />
          </span>
          <br />
          <br />
          <p>The first todo!</p>
          <Input
            icon="add circle"
            iconPosition="left"
            placeholder="Title of todo"
            name="title"
            onChange={props.handleChange}
          />
          <Input
            icon="clock"
            iconPosition="left"
            placeholder="Estimated Time"
            name="time"
            onChange={props.handleChange}
          />
          <br />
          <br />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => props.setShowModal(false)}>
            Cancel
          </Button>
          <Button positive onClick={() => props.handleNewTodoList()}>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CreateTodoListModal;

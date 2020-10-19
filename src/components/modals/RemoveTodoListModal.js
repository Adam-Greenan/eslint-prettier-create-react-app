import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const RemoveTodoListModal = (props) => {

  return (
    <Modal
      basic
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
      size="small"
    >
      <Header icon>
        <Icon name="remove" />
        Remove Todo List
      </Header>
      <Modal.Content >
        <p>
          Are you sure you would like to permanetly remove this todo list?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => props.setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" inverted onClick={() => props.handleDeleteTodoList()}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default RemoveTodoListModal
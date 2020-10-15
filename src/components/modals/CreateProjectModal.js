import React from 'react';
import {Modal, Input, Button} from 'semantic-ui-react'

const CreateProjectModal = (props) => {
  return (
    <div>
      <Modal size={'tiny'} open={props.showModal} onClose={() => props.setShowModal(false)}>
        <Modal.Header>Creating New Project</Modal.Header>
        <Modal.Content>
          <p>Please type your desired project name.</p>
          <Input
            icon="users"
            iconPosition="left"
            placeholder="New Project Name"
            name="name"
            onChange={props.handleChange}
          />
          <br />
          <br />
          <Input
            icon="users"
            iconPosition="left"
            placeholder="Number of Devs available?"
            name="nOfDevs"
            onChange={props.handleChange}
          />
          <br />
          <br />
          <Input
            icon="users"
            iconPosition="left"
            placeholder="Start date of project?"
            name="startDate"
            onChange={props.handleChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => props.setShowModal(false)}>
            Cancel
          </Button>
          <Button positive onClick={() => props.handleCreateProject()}>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CreateProjectModal

import React from 'react';
import {Modal, Input, Button} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
          <DatePicker selected={props.startDate} onChange={date => props.handleDateChange(date)} />
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

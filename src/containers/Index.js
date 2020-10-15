import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import projects from '../store/reducers/projects';

const Index = (props) => {
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    let projectList = ['test']
    
    useEffect(() => {
        props.fetchExistingProjects()
    }, [])

    useEffect(() => {
        projectList = [props.project]
        console.log("[second use affect]");
    }, [props.fetchExistingProjects])

  return (
    <div>
      <div>
        <h1>Welcome to your project manager!</h1>
        <Button onClick={() => setShowModal(true)}>Create new project</Button>

        <Modal
          size={'tiny'}
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <Modal.Header>Creating New Project</Modal.Header>
          <Modal.Content>
            <p>Please type your desired project name.</p>
            <Input
              icon="users"
              iconPosition="left"
              placeholder="New Project Name"
              onChange={(e) => setNewProjectTitle(e.target.value)}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              positive
              onClick={
                () => {
                  props.createNewProject(newProjectTitle);
                } /*Need a redux action to take place to create project*/
              }
            >
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
      <div>
          {projectList}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projectReducer.projects[0],
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    createNewProject: (name) =>
      dispatch(actionCreators.initCreateProject(name)),
    fetchExistingProjects: () => dispatch(actionCreators.fetchInitialProjects())  
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Index);

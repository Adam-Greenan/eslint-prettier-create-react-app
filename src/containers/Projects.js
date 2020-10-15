import React, { Component, useState, useEffect } from 'react';
import { Button, Modal, Input, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../store/actions/index';
// import projects from '../store/reducers/projects';

class Projects extends Component {
  state = {
    showModal: false,
    newProjectData: {
        name: '',
        nOfDevs: '',
        startDate: ''
    },
    projects: null,
  };

  

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleChange = (e) => {
    this.setState({
      newProjectData: {
          ...this.state.newProjectData,
          [e.target.name]: e.target.value
      }
    });
  };

  handleCreateProject = () => {
    this.props.createNewProject(this.state.newProjectData);
    this.closeModal();
  };

  render() {
    let projectList = '';
    if (this.props.loading === false) {
      projectList = this.props.projects.map((p) => (
        <Link to={'/projects/' + p[1].name} key={p[1].name}>
          <Card centered header={p[1].name} meta="Test " />
        </Link>
      ));
    }

    return (
      <div>
        <div>
          <h1>Welcome to your project manager!</h1>
          <Button onClick={this.openModal}>Create new project</Button>

          <Modal size={'tiny'} open={this.state.showModal} onClose={() => {}}>
            <Modal.Header>Creating New Project</Modal.Header>
            <Modal.Content>
              <p>Please type your desired project name.</p>
              <Input
                icon="users"
                iconPosition="left"
                placeholder="New Project Name"
                name="name"
                onChange={this.handleChange}
              />
              <br />
              <br />
              <Input
                icon="users"
                iconPosition="left"
                placeholder="Number of Devs available?"
                name="nOfDevs"
                onChange={this.handleChange}
              />
              <br />
              <br />
              <Input
                icon="users"
                iconPosition="left"
                placeholder="Start date of project?"
                name="startDate"
                onChange={this.handleChange}
              />
              
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.closeModal}>
                Cancel
              </Button>
              <Button
                positive
                onClick={() => {
                  this.handleCreateProject();
                }}
              >
                Confirm
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
        <br></br>
        <div>{projectList}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projectReducer.projects,
    loading: state.projectReducer.loading,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    createNewProject: (projectData) =>
      dispatch(actionCreators.initCreateProject(projectData)),
    fetchExistingProjects: () =>
      dispatch(actionCreators.fetchInitialProjects()),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Projects);

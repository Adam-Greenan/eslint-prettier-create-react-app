import React, { Component, useState, useEffect } from 'react';
import { Button, Modal, Input, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../store/actions/index';
import CreateProjectModal from '../components/modals/CreateProjectModal';
// import projects from '../store/reducers/projects';

const Projects = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    name: '',
    nOfDevs: '',
    startDate: '',
  });

  useEffect(() => {
    props.fetchExistingProjects();
  }, []);

  const handleChange = (e) => {
    setNewProjectData({
      ...newProjectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProject = () => {
    props.createNewProject(newProjectData);
    setShowModal(false);
  };

  let projectList = '';
  if (props.loading === false) {
    projectList = props.projects.map((p) => (
      <Link to={'/projects/' + p[1].name} key={p[1].name}>
        <Card centered header={p[1].name} meta="Test " />
      </Link>
    ));
  }

  return (
    <div>
      <div>
        <h1>Welcome to your project manager!</h1>
        <Button onClick={() => setShowModal(true)}>Create new project</Button>

        <CreateProjectModal
          handleCreateProject={handleCreateProject}
          setShowModal={setShowModal}
          showModal={showModal}
          handleChange={handleChange}
        />

      </div>
      <br></br>
      <div>{projectList}</div>
    </div>
  );
};

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
// export default Projects;

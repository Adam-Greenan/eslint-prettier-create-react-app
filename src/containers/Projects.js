import React, { useState, useEffect } from 'react';
import { Button, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as actionCreators from '../store/actions/index';
import { v4 as uuid} from 'uuid'
import CreateProjectModal from '../components/modals/CreateProjectModal';
// import projects from '../store/reducers/projects';

const Projects = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    name: '',
    nOfDevs: '',
    startDate: new Date(),
    TodoLists: [{title: 'Design', dependent: 'None', todos: [{title: 'Make some Todos!', time: 1, uid: uuid(), sequential: 0, seqData: ''}]}, {title: 'Develop', dependent: 'None', todos: [{title: 'Make some Todos!', time: 1, uid: uuid(), sequential: 0, seqData: ''}]}]
  });

  useEffect(() => {
    props.fetchExistingProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setNewProjectData({
      ...newProjectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    console.log(new Date(date).toISOString())
    setNewProjectData({
      ...newProjectData,
      startDate: date,
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
        { props.isCreated && <Redirect to={`/projects/${newProjectData.name}`} />}
        <h1>Welcome to your project manager!</h1>
        <Button onClick={() => setShowModal(true)}>Create new project</Button>
        <CreateProjectModal
          handleCreateProject={handleCreateProject}
          setShowModal={setShowModal}
          showModal={showModal}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          startDate={newProjectData.startDate}
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
    isCreated: state.projectReducer.createdProjectSuccess,
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

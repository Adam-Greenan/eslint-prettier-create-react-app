import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Container,
  Divider,
  Button,
  Header,
  Dropdown,
} from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/index';
import DateGenerator from '../estDateGenerator/dateGenerator';
import TodoLists from './TodoLists/TodoLists';

const Project = (props) => {
  useEffect(() => {
    props.fetchProject(props.match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProperty = (name, data) => {
    const pr_name = props.project.name;
    props.updateProjectProperty(name, data, pr_name);
  };

  if (props.loading === true) {
    return (
      <div>
        <span>loading</span>
        <Button onClick={() => {}}>Load</Button>
      </div>
    );
  }
  const { name, startDate } = props.project;
  const nDevs = [...Array(10)].map((dev, i) => {
    return { key: i + 1, text: i + 1, value: i + 1, name: 'nOfDevs' };
  });
  console.log(nDevs);
  const dropdownOptions = [...nDevs];
  return (
    <div>
      <Container>
        <Divider />
        <Header size="large">{name}</Header>
        <Divider />
        <p>The proposed start date for your project:</p>
        <DatePicker
          selected={new Date(startDate)}
          onChange={(date) =>
            // is props.project[0] correct here? Im not sure, but the thing above uses props.project[1]
            // Also, your updateProperty function above takes its first argument as the name, but this looks like
            // you are passing the whole project?
            updateProperty(props.project.key, { startDate: date })
          }
        />
        <br />
        <h3><span>Number of developers:  </span>
        <Dropdown
          inline
          options={dropdownOptions}
          defaultValue={dropdownOptions[props.project.nOfDevs-1].value}
          name={'nOfDevs'}
          onChange={(e) =>
            updateProperty(props.project.key, { nOfDevs: e.target.textContent })
          }
        ></Dropdown>
        <DateGenerator
          startDate={props.project.startDate}
          taskLists={props.project.TodoLists}
          nOfDevs={props.project.nOfDevs}
        />
        </h3>
      </Container>
      <br />
      <Container>{/* {props.project.TodoLists &&*/ <TodoLists />}</Container>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    project: state.projectReducer.currentProject,
    loading: state.projectReducer.loadingProject,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: (id) => dispatch(actionCreators.fetchProject(id)),
    updateProjectProperty: (name, data, pr_name) =>
      dispatch(actionCreators.updateProjectPropertyInit(name, data, pr_name)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Project);

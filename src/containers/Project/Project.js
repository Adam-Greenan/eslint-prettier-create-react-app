import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Input, Divider, Header } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/index';

const Project = (props) => {
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    props.fetchProject(props.match.params.id);
  }, []);

  //   useEffect(() => {
  //       const project = props.project
  //         project.map(() => console.log('test'))
  //   }, [props.project && props.loading])

  let content = 'loading';

  if (props.loading === false) {
    const { name, startDate } = props.project[1];
    const updateProperty = (name, data, ) => {

      props.updateProjectProperty(name, data);
    };
    content = (
      <Container>
        <Divider />
        <Header size="large">{name}</Header>
        <Divider />
        <p>The proposed start date for your project:</p>
        <DatePicker
          selected={new Date(startDate)}
          onChange={(date) => updateProperty(props.project[0], {'startDate': date})}
        />
      </Container>
    );
  }

  return <div>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    project: state.projectReducer.currentProject[0],
    loading: state.projectReducer.loadingProject,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: (id) => dispatch(actionCreators.fetchProject(id)),
    updateProjectProperty: (name, data) =>
      dispatch(actionCreators.updateProjectPropertyInit(name, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);

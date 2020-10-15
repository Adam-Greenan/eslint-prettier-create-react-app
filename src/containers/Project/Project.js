import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Input, Divider, Header } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/index';

const Project = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date())
  useEffect(() => {
    props.fetchProject(props.match.params.id);
  }, []);

  let content = "loading"
  
  if(props.loading === false) {
      console.log(props.project)
      const {name} = props.project[1]
    content = (
        <Container>
            <Divider />
            <Header size='large'>{name}</Header>
            <Divider />
            <p>The proposed start date for your project:</p>
            <DatePicker selected={selectedDate} onChange={setSelectedDate}/>
        </Container>
    )
  }

    return (
      <div>
        {content}
      </div>
    );
  
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);

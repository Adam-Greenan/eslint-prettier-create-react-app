import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchInitialProjects = () => {
  return (dispatch) => {
    dispatch(fetchInitialProjectsStart());
    axios
      .get('https://projects-komodo.firebaseio.com/projects.json')
      .then((response) => {
        dispatch(fetchInitialProjectsSuccess(response.data));
      });
  };
};

export const fetchProject = (id) => {
  let queryParams = `?&orderBy="name"&equalTo="${id}"`;
  return (dispatch) => {
    axios
      .get('https://projects-komodo.firebaseio.com/projects.json' + queryParams)
      .then((response) => {
        dispatch(fetchProjectSuccess(response));
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };
};

export const fetchProjectSuccess = (response) => {
  return {
    type: actionTypes.FETCH_PROJECT_SUCCESS,
    project: response.data,
  };
};

export const fetchInitialProjectsStart = () => {
  return {
    type: actionTypes.FETCH_INITIAL_PROJECT_START,
  };
};

export const fetchInitialProjectsSuccess = (projects) => {
  return {
    type: actionTypes.FETCH_INITIAL_PROJECT_SUCCESS,
    projects: projects,
  };
};

export const initCreateProject = (projectData) => {
  return (dispatch) => {
    axios
      .post('https://projects-komodo.firebaseio.com/projects.json', {
        ...projectData,
      })
      .then((response) => {
        dispatch(createProjectSuccess())
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createProjectSuccess = () => {
  return {
    type: actionTypes.CREATE_PROJECT_SUCCESS,
  };
};

export const updateProjectPropertyInit = (key, data, pr_name, path) => {
  return {
    type: actionTypes.UPDATE_PROJECT_PROPERTY, //To the index saga -> projects Saga
    key: key, //Data
    data: data, //Data
    path: path,
    pr_name: pr_name,
  };
};

export const updateProjectPropertyStart = () => {
  return {
    type: actionTypes.UPDATE_PROJECT_PROPERTY_START,
  };
};

export const updateProjectPropertyPatch = (key, data, pr_name) => {
  return (dispatch) => {
    console.log('hello', data)
    axios
      .patch(
        `https://projects-komodo.firebaseio.com/projects/${key}.json`,
        data
      )
      .then((response) => {
        console.log(pr_name);
        dispatch(updateProjectReloader(pr_name));
      })
      .catch((error) => {
        console.log(error);
      });
    return {
      type: actionTypes.UPDATE_PROJECT_PROPERTY_PATCH,
    };
  };
};

export const updateProjectReloader = (id) => {
  return (dispatch) => {
    let queryParams = `?&orderBy="name"&equalTo="${id}"`;
    axios
      .get('https://projects-komodo.firebaseio.com/projects.json' + queryParams)
      .then((response) => {
        dispatch(updateProjectPropertySuccess(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateProjectPropertySuccess = (res) => {
  return {
    type: actionTypes.UPDATE_PROJECT_PROPERTY_SUCCESS,
    project: res.data,
  };
};

export const updateProjectTodosInit = (key, todos) => {
  return {
    type: actionTypes.UPDATE_PROJECT_TODOS_INIT,
    key: key,
    todos: todos,
  };
};

export const updateProjectTodosStart = (todos) => {
  return {
    type: actionTypes.UPDATE_PROJECT_TODOS_START,
    todos: todos,
  };
};

export const updateProjectTodosPatch = (key) => {
  return (dispatch, getState) => {
    const todos = getState().projectReducer.currentTodos
    axios
      .put(
        `https://projects-komodo.firebaseio.com/projects/${key}/TodoLists.json`,
        todos
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    return {
      type: actionTypes.UPDATE_PROJECT_TODOS_PATCH,
    };
  };
};

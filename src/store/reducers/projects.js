import * as actionTypes from '../actions/actionTypes';
import { projectDeEncoder } from '../helper';
const initialState = {
  projects: [],
  currentTodos: [],
  currentProject: [],
  loading: true,
  loadingProject: true,
};

const projects = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.FETCH_INITIAL_PROJECT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_INITIAL_PROJECT_SUCCESS:
      if (action.projects !== null) {
        const projects = Object.entries(action.projects);
        return {
          ...state,
          projects: [...projects],
          loading: false,
        };
      } else {
        return state;
      }
    case actionTypes.FETCH_PROJECT_SUCCESS:
      const project = projectDeEncoder(action.project);
      return {
        ...state,
        currentProject: project,
        currentTodos: project.TodoLists,
        loadingProject: false,
      };
    case actionTypes.UPDATE_PROJECT_PROPERTY_START:
      return {
        ...state,
        loadingProject: true,
      };
    case actionTypes.UPDATE_PROJECT_PROPERTY_PATCH:
      return {
        ...state,
      };
    case actionTypes.UPDATE_PROJECT_PROPERTY_RELOADER:
      return {
        ...state,
        currentProject: projectDeEncoder(action.project),
      };
    case actionTypes.UPDATE_PROJECT_PROPERTY_SUCCESS:
      return {
        ...state,
        currentProject: projectDeEncoder(action.project),
        loadingProject: false,
      };
    case actionTypes.UPDATE_PROJECT_TODOS_START:
    return {
        ...state,
        currentTodos: action.todos,
      };
    case actionTypes.UPDATE_PROJECT_TODOS_PATCH:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default projects;

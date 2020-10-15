import * as actionTypes from '../actions/actionTypes';
const initialState = {
  projects: [],
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
      console.log(action.projects);
      if (action.projects !== null) {
        return {
          ...state,
          projects: [...Object.entries(action.projects)],
          loading: false,
        };
      } else {
        return state;
      }
    case actionTypes.FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        currentProject: [...Object.entries(action.project)],
        loadingProject: false,
      };
    case actionTypes.UPDATE_PROJECT_PROPERTY_START:
        return {
            ...state, 
            loadingProject: true
        }
    case actionTypes.UPDATE_PROJECT_PROPERTY_PATCH:
        return {
            ...state
        }
    case actionTypes.UPDATE_PROJECT_PROPERTY_RELOADER:
        return {
            ...state,
            currentProject: [...Object.entries(action.project)],
        }
    case actionTypes.UPDATE_PROJECT_PROPERTY_SUCCESS:
        return {
            state,
            currentProject: [...Object.entries(action.project)],
            loadingProject: false
        }
    default:
      return state;
  }
};

export default projects;

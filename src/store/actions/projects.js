import * as actionTypes from './actionTypes'
import axios from 'axios'

export const fetchInitialProjects = () => {
    return (dispatch) => {
        dispatch(fetchInitialProjectsStart())
        axios
            .get("https://projects-komodo.firebaseio.com/projects.json")
            .then((response) => {
                dispatch(fetchInitialProjectsSuccess(response.data))
            })
    }
}

export const fetchProject = (id) => {
    let queryParams = `?&orderBy="name"&equalTo="${id}"`
    return (dispatch) => {
        axios.get("https://projects-komodo.firebaseio.com/projects.json" + queryParams)
        .then((response) => {
            console.log("[fetchproject .then]", response)
            dispatch(fetchProjectSuccess(response))
        })
        .catch((error) => {
            console.log(JSON.stringify(error))
        })
        
    }
}

export const fetchProjectSuccess = (response) => {
    return {
        type: actionTypes.FETCH_PROJECT_SUCCESS,
        project: response.data
    }
}

export const fetchInitialProjectsStart = () => {
    return {
        type: actionTypes.FETCH_INITIAL_PROJECT_START,
    }
}

export const fetchInitialProjectsSuccess = (projects) => {
    return {
        type: actionTypes.FETCH_INITIAL_PROJECT_SUCCESS,
        projects: projects
    }
}

export const initCreateProject = (projectData) => {
    return (dispatch) => {
        axios
            .post("https://projects-komodo.firebaseio.com/projects.json", {...projectData})
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    } 
}

export const createProjectSuccess = (response) => {
    return {
        type: actionTypes.CREATE_PROJECT_SUCCESS,
        res: response
    }
}


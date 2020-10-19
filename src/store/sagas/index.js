import {
    updateProjectProperty, updateProjectTodosInit
  } from "./projects";
  import { takeEvery } from "redux-saga/effects";
  import * as actionTypes from "../actions/actionTypes";
  
  export function* watchAuth() {
    yield takeEvery(actionTypes.UPDATE_PROJECT_PROPERTY, updateProjectProperty);
    yield takeEvery(actionTypes.UPDATE_PROJECT_TODOS_INIT, updateProjectTodosInit);
  }
  
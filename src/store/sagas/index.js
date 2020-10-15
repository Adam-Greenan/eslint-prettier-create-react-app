import {
    updateProjectProperty
  } from "./projects";
  import { takeEvery } from "redux-saga/effects";
  import * as actionTypes from "../actions/actionTypes";
  
  export function* watchAuth() {
    yield takeEvery(actionTypes.UPDATE_PROJECT_PROPERTY, updateProjectProperty);
  }
  
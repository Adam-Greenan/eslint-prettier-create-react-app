import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';

export function* updateProjectProperty(action) {
    yield put(actions.updateProjectPropertyStart())
    yield put(actions.updateProjectPropertyPatch(action.name, action.data))
    yield put(actions.updateProjectReloader())
}

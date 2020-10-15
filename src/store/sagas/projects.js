import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';

export function* updateProjectProperty(action) {
    const name = action.name
    const data = action.data
    yield put(actions.updateProjectPropertyStart())
    yield put(actions.updateProjectPropertyPatch(name, data))
    yield put(actions.updateProjectReloader('132213'))
}

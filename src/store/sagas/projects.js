import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* updateProjectProperty(action) {
    yield put(actions.updateProjectPropertyStart())
    yield put(actions.updateProjectPropertyPatch(action.name, action.data, action.pr_name))
}

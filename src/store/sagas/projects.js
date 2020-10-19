import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* updateProjectProperty(action) {
    yield put(actions.updateProjectPropertyStart())
    yield put(actions.updateProjectPropertyPatch(action.key, action.data, action.pr_name, action.path))
}

export function* updateProjectTodosInit(action, state) {
    yield put(actions.updateProjectTodosStart(action.todos))
    yield put(actions.updateProjectTodosPatch(action.key, state))
}
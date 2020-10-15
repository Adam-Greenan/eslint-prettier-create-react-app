import * as actionTypes from './actionTypes'

export const add = () => {
    return {
        type: actionTypes.ADD
    }
}

export const sub = () => {
    return {
        type: actionTypes.SUB
    }
}

export const setCounter = (value) => {
    return {
        type: actionTypes.SET_COUNTER,
        value: value
    }
}
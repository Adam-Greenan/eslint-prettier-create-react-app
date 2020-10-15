import * as actionTypes from '../actions/actionTypes';
const initialState = {
    counter: 100,
};

const indexReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
        return {
            counter: state.counter + 1
        }
    case actionTypes.SUB: 
        return {
            counter: state.counter - 1
        }
    case actionTypes.SET_COUNTER:
        return {
            counter: action.value
        }
    default:
      return state;
  }
};

export default indexReducer;
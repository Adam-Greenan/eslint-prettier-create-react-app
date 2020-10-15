import React, {useState} from 'react';
import * as actionCreators from '../store/actions/index'
import { connect } from 'react-redux';

const Home = (props) => {
    const [input, setInput] = useState(Number)

    return (
    <div>
      <p>Home pagn e</p>
      <p>{props.counter}</p>
      <button onClick={props.onAdd}>add 1</button>
      <button onClick={props.onSub}>sub 1</button>
      <br></br>
      <input type='text' name='input' value={input} onChange={(e) => setInput(+ e.target.value)} />
      <button onClick={() => props.setCounter(input)}>set to 50</button>
    </div>
  );
};

const mapStateToProps = state => {
    return {
        counter: state.indexReducer.counter,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAdd: () => dispatch(actionCreators.add()),
        onSub: () => dispatch(actionCreators.sub()),
        setCounter: (num) => dispatch(actionCreators.setCounter(num))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;

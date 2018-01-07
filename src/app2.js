import { h, app } from 'hyperapp';

const state = {
  a: {
    count: 0,
  },
  b: {
    count: 0,
  }
}

const actions = {
  a: {
    up: () => state => {
      console.log(state);
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    },
    down: () => state => {
      return Object.assign({}, state, {
        count: state.count - 1,
      });
    },
  },
  b: {
    up: () => state => {
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    },
    down: () => state => {
      return Object.assign({}, state, {
        count: state.count - 1,
      });
    },
  }
}

const view = (state, actions) => {
  console.log(state);
  console.log(actions);
  return (
    <div>
      <Count count={state.a.count} />
      <Button handleClick={actions.a.up} label="+" />
      <Button handleClick={actions.a.down} label="-" />
    </div>
  )
};

const Count = (props) => <h1>{props.count}</h1>;
const Button =(props) => <button onclick={props.handleClick}>{props.label}</button>

app(state, actions, view, document.querySelector('.content'));

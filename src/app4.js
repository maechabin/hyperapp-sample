import { h, app } from 'hyperapp';

const state = {
  inputValue: null,
  value: [],
  sort: 'sales',
};

const actions = {
  handleChange: (e) => state => {
    return Object.assign({}, state, {
      inputValue: e.target.value,
    });
  },
  handleClick: () => state => {
    return Object.assign({}, state, {
      value: [...state.value, state.inputValue],
      inputValue: null,
    });
  },
};

const view = (state, actions) => (
  <div>
    <Input handleChange={actions.handleChange} value={state.inputValue} />
    <Button handleClick={actions.handleClick} />
    <Result value={state.value} />
  </div>
);

const Input = (props) => {
  return (
    <input type="text" onchange={props.handleChange} value={props.value} />
  );
};

const Button = (props) => {
  return (
    <button type="button" onclick={props.handleClick}>検索</button>
  );
};

const Result = (props) => {
  const lists = props.value.map(list => {
    return <li>{list}</li>;
  });
  return (
    <ul>{lists}</ul>
  );
};

app(state, actions, view, document.querySelector('.content'));

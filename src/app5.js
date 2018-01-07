import { h, app } from 'hyperapp';
import "babel-polyfill";
import { config } from '../config';

const state = {
  inputValue: null,
  value: null,
  items: [],
};

const actions = {
  handleChange: (e) => state => {
    return Object.assign({}, state, {
      inputValue: e.target.value,
    });
  },
  handleClick: () => async (state, actions) => {
    const res = await actions.fetchData(state.inputValue);
    actions.setValue();
    actions.setItem(res);
    console.log(res);
  },
  setValue: () => state => {
    return Object.assign({}, state, {
      value: state.inputValue,
      inputValue: null,
    });
  },
  setItem: (res) => state => {
    return Object.assign({}, state, {
      items: res.Items,
    });
  },
  fetchData: async (keyword) => {
    try {
      const params = '?'
        + 'formatVersion=2'
        + `&applicationId=${config.rakutenApiKey}`
        + '&sort=sales'
        + `&keyword=${keyword}`;
      const response = await fetch(`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20130522${params}`, {
        method: 'get',
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
};

const view = (state, actions) => (
  <div>
    <Input handleChange={actions.handleChange} value={state.inputValue} />
    <Button handleClick={actions.handleClick} />
    <Result value={state.value} items={state.items} />
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
  const title = props.value ? `「${props.value}」の検索結果` : '';
  const items = props.items ? props.items.map(item => {
    return (
      <p key={item.isbn}>{item.title}</p>
    );
  }) : '';
  return (
    <div>
      <h1>{title}</h1>
      <div>
        {items}
      </div>
    </div>
  );
};

app(state, actions, view, document.querySelector('.content'));

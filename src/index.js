import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './assets/styles/index.css';
import configureStore from './store';
import TodoListContainer from './containers/TodoListContainer';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <TodoListContainer/>
    </Provider>,
    document.getElementById('root')
);

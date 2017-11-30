import PropTypes from 'prop-types';
import React, {Component} from 'react';

import '../assets/styles/TodoList.css';
import TodoElement from './TodoElement';
import logo from '../assets/images/logo.svg';
import loading from '../assets/images/loading.svg';

class TodoList extends Component {
    componentDidMount() {
        this.props.fetchTodoItems();
    }

    deleteTodoItem = (itemId) => {
        this.props.deleteTodoItem(itemId);
    };

    render() {
        const {isLoading, error, items, deletingItemId} = this.props;

        const elements = items.map(
            (item) => <TodoElement key={item.id} deletingItemId={deletingItemId}
                                   deleteTodoItem={this.deleteTodoItem} element={item}/>
        );

        let body;
        if (isLoading) {
            body = <img className="list-loading" src={loading} alt="List is being retrieved"/>
        } else if (!isLoading && !error && elements.length) {
            body = (
                <table className="table-custom table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>{elements}</tbody>
                </table>
            )
        }

        return (
            <div className="todo">
                <header className="todo-header">
                    <img src={logo} className="todo-logo" alt="logo"/>
                    <h1 className="todo-title">Welcome to the best TODO list ever</h1>
                </header>
                {body}
            </div>
        );
    }
}

PropTypes.propTypes = {
    items: PropTypes.array.isRequired,
    error: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchTodoItems: PropTypes.func.isRequired,
    deleteTodoItem: PropTypes.func.isRequired,
    deletingItemId: PropTypes.number.isRequired
};


export default TodoList;

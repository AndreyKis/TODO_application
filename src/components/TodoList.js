import PropTypes from 'prop-types';
import React, {Component} from 'react';

import loading from '../assets/images/loading.svg';
import '../assets/styles/todoList.css';
import '../assets/styles/shared.css';
import TodoItem from './TodoItem';
import Navbar from "./Navbar";
import Error from "./Error";

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {filteredItems: []};
    }

    componentDidMount() {
        this.props.fetchTodoItems();
    }

    render() {
        const body = this.generateBody();

        return (
            <div className="todo">
                <Navbar onFilterChanged={this.filterByTitle} onRefresh={this.props.fetchTodoItems}/>
                {body}
            </div>
        );
    }

    generateBody = () => {
        const {isLoading, items, error, itemsInProcessIds, completeTodoItem} = this.props;

        const {filteredItems} = this.state;

        const itemsToProcess = filteredItems && filteredItems.length ? filteredItems : items;
        const itemComponents = itemsToProcess.map(
            (item) => <TodoItem key={item.id} itemsInProcessIds={itemsInProcessIds}
                                deleteTodoItem={this.deleteTodoItem} item={item} completeTodoItem={completeTodoItem}/>
        );

        if (isLoading) {
            return <img className="list-loading" src={loading} alt="List is being retrieved"/>
        }
        if (error) {
            return <Error error={error}/>
        }

        return (
            <table className="table-custom table-hover table-bordered">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Completed</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>{itemComponents}</tbody>
            </table>
        )
    };

    deleteTodoItem = (itemId) => {
        this.props.deleteTodoItem(itemId);
    };

    filterByTitle = (event) => {
        if (this.props.items) {
            const title = event.target.value;
            const filteredItems = this.props.items.filter((item) => item.title.toLocaleLowerCase().includes(title.toLowerCase()));
            this.setState({
                filteredItems
            })
        }
    };

}

PropTypes.propTypes = {
    items: PropTypes.array.isRequired,
    error: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchTodoItems: PropTypes.func.isRequired,
    deleteTodoItem: PropTypes.func.isRequired,
    completeTodoItem: PropTypes.func.isRequired,
    itemsInProcessIds: PropTypes.array.isRequired
};


export default TodoList;

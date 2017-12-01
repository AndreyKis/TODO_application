import PropTypes from 'prop-types';
import React, {Component} from 'react';

import loading from '../assets/images/loading.svg';
import '../assets/styles/todoList.css';
import '../assets/styles/shared.css';
import TodoItem from './TodoItem';
import Navbar from "./Navbar";
import Error from "./Error";

/**
 *
 */
class TodoList extends Component {
    state = {
        filteredItems: []
    };

    generateBody = () => {
        const {isLoading, error, items, deleteTodoItem, completeTodoItem, itemsInProcessIds} = this.props;

        if (isLoading) {
            return (
                <img className="list-loading" src={loading} alt="List is being retrieved"/>
            );
        }

        if (error) {
            return (
                <Error error={error}/>
            );
        }

        const {filteredItems} = this.state;
        const itemsToProcess = (filteredItems && filteredItems.length) ? filteredItems : items;

        const itemComponents = itemsToProcess.map((item) => (
            <TodoItem
                item={item}
                key={item.id}
                deleteTodoItem={deleteTodoItem}
                completeTodoItem={completeTodoItem}
                itemsInProcessIds={itemsInProcessIds}
            />
        ));

        return (
            <div className="col-md-10 col-md-offset-1">
                <div className="panel panel-primary panel-primary-custom">
                    <div className="panel-heading">
                        <h3 className="panel-title">List of todos</h3>
                    </div>
                    <div className="panel-body">
                        Here is your todo list, sir. Do not forget to mark completed todos and remove unnecessary ones
                    </div>
                    <table className="todo table table-striped table-hover table-bordered">
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
                </div>
            </div>
        )
    };

    filterByTitle = (event) => {
        const title = event.target.value;
        const filteredItems = this.getFilteredItems(title, this.props.items);

        this.setState({title, filteredItems});
    };

    getFilteredItems = (title, items) => {
        return items.filter((item) => item.title.toLocaleLowerCase().includes(title.toLowerCase()));
    };

    componentDidMount() {
        this.props.fetchTodoItems();
    }

    componentWillReceiveProps(nextProps) {
        const nextItems = nextProps.items;
        const currItems = this.props.items;
        const {title, filteredItems} = this.state;

        if (currItems !== nextItems && title && filteredItems && filteredItems.length) {
            const newFilteredItems = this.getFilteredItems(title, nextItems);

            this.setState({filteredItems: newFilteredItems});
        }
    }

    render() {
        return (
            <div>
                <Navbar
                    onFilterChanged={this.filterByTitle}
                    onRefresh={this.props.fetchTodoItems}
                />
                {this.generateBody()}
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
    completeTodoItem: PropTypes.func.isRequired,
    itemsInProcessIds: PropTypes.array.isRequired
};


export default TodoList;

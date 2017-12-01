import PropTypes from 'prop-types';
import React, {Component} from 'react';

import '../assets/styles/shared.css';
import '../assets/styles/todoItem.css';
import loading from '../assets/images/loading.svg';

/**
 *
 */
class TodoItem extends Component {
    generateCompleteButton = () => {
        const {item, completeTodoItem, itemsInProcessIds} = this.props;

        if (itemsInProcessIds && itemsInProcessIds.length && itemsInProcessIds.includes(item.id)) {
            return <img className="item-loading" src={loading} alt="Item is being processed"/>;
        } else if (item.completed) {
            return <i className="fa fa-check fa-check-custom" aria-hidden="true"/>;
        }

        return (
            <button onClick={() => completeTodoItem(item)} className="transparent-button">
                <i className="fa fa-ban fa-custom-red" aria-hidden="true"/>
            </button>
        );
    };

    generateDeleteButton = () => {
        const {item, deleteTodoItem, itemsInProcessIds} = this.props;

        if (itemsInProcessIds && itemsInProcessIds.length && itemsInProcessIds.includes(item.id)) {
            return (
                <img className="item-loading" src={loading} alt="Item is being processed"/>
            );
        }

        return (
            <button onClick={() => deleteTodoItem(item)} className="transparent-button">
                <i className="fa fa-trash fa-custom-red" aria-hidden="true"/>
            </button>
        );
    };

    render() {
        const {item} = this.props;
        const deleteButton = this.generateDeleteButton();
        const completeButton = this.generateCompleteButton();

        return (
            <tr>
                <td>
                    {item.id}
                </td>
                <td className="td-custom">
                    {item.title}
                </td>
                <td>
                    {completeButton}
                </td>
                <td>
                    {deleteButton}
                </td>
            </tr>
        );
    }
}

PropTypes.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    completeTodoItem: PropTypes.func.isRequired,
    deleteTodoItem: PropTypes.func.isRequired,
    itemsInProcessIds: PropTypes.array.isRequired
};


export default TodoItem;

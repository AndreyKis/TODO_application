import PropTypes from 'prop-types';
import React, {Component} from 'react';

import '../assets/styles/TodoElement.css';
import loading from '../assets/images/loading.svg';

class TodoElement extends Component {
    render() {
        const {element, onComplete, deleteTodoItem, deletingItemId} = this.props;

        const deleteButton = deletingItemId && deletingItemId === element.id
            ? <img className="element-loading" src={loading} alt="Element is being deleted"/>
            : (
                <button onClick={() => deleteTodoItem(element.id)} className="icon-button">
                    <i className="fa fa-trash" style={{color: "red"}} aria-hidden="true"/>
                </button>
            );

        return (
            <tr>
                <td>
                    {element.id}
                </td>
                <td>
                    {element.title}
                </td>
                <td>
                    {element.completed && <i className="fa fa-check" style={{color: "green"}} aria-hidden="true"/>}
                </td>
                <td>
                    {deleteButton}
                </td>
            </tr>
        );
    }
}

PropTypes.propTypes = {
    element: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onComplete: PropTypes.func.isRequired,
    deleteTodoItem: PropTypes.func.isRequired,
    deletingItemId: PropTypes.bool.isRequired
};


export default TodoElement;

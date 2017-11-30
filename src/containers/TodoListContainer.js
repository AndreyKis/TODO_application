import {connect} from 'react-redux';

import TodoList from '../components/TodoList';
import * as TodoListActions from "../store/actions/todoListActions";

const mapStateToProps = (state) => {
    return state.todoListReducer;
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodoItems: () => {
            dispatch(TodoListActions.fetchTodoItems());
        },
        deleteTodoItem: (itemId) => {
            dispatch(TodoListActions.deleteTodoItem(itemId));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
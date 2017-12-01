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
        deleteTodoItem: (item) => {
            dispatch(TodoListActions.deleteTodoItem(item));
        },
        completeTodoItem: (item) => {
            dispatch(TodoListActions.completeTodoItem(item));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
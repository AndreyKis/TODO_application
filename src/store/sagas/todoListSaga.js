import {call, takeLatest, takeEvery, select, all, put} from 'redux-saga/effects'

import * as TodoListActions from '../actions/todoListActions'
import {getTodos, deleteTodo} from '../../helpers/todoApi'

/**
 *
 * @param store
 * @param action
 */
function* fetchTodoList(store, action) {
    try {
        const itemsResponse = yield getTodos();
        itemsResponse.ok
            ? yield put(TodoListActions.itemsFetchSuccess(itemsResponse.data))
            : yield put(TodoListActions.itemsFetchFailure(itemsResponse.error));
    } catch (e) {
        yield call(TodoListActions.itemsFetchFailure, e);
    }
}

/**
 * Deletes todo item from the list of todos on fake API server.
 * API server is fake and nothing happens on server,
 * but we fake the delete in case of successful response and delete item locally
 * @param store
 * @param action
 */
function* deleteTodoItem(store, action) {
    try {
        const {itemId} = action.payload;

        const itemsResponse = yield deleteTodo(itemId);
        const items = yield select(TodoListActions.selectors.getItems);

        // Filtering is used here, because of the way API deletes elements. No delete happens for real.
        // In case of true API we would make another call to fetch the new array from server
        itemsResponse.ok
            ? yield put(TodoListActions.deleteTodoItemSuccess(items.filter((item) => item.id !== itemId)))
            : yield put(TodoListActions.deleteTodoItemFailure(itemsResponse.error));
    } catch (e) {
        yield call(TodoListActions.deleteTodoItemFailure, e);
    }
}

export function* init(store, context) {
    yield all([
        takeLatest(TodoListActions.FETCH_TODO_ITEMS_REQUEST, fetchTodoList, store),
        takeLatest(TodoListActions.DELETE_TODO_ITEM_REQUEST, deleteTodoItem, store)
    ]);
}
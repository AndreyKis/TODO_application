import {call, takeLatest, takeEvery, select, all, put} from 'redux-saga/effects'

import * as TodoListActions from '../actions/todoListActions'
import {getTodos, deleteTodo, updateTodo} from '../../helpers/todoApi'

/**
 * Retrieves the whole list of todos
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
    const {itemId} = action.payload;
    const itemsInProcess = yield select(TodoListActions.selectors.getItemsInProcessIds);
    const newItemsInProcess = itemsInProcess.filter((item) => item !== itemId);

    try {

        const itemsResponse = yield deleteTodo(itemId);
        const items = yield select(TodoListActions.selectors.getItems);

        // Filtering is used here, because of the way API deletes items. No delete happens for real.
        // In case of true API we would make another call to fetch the new array from server
        const newItems = items.filter((item) => item.id !== itemId);

        itemsResponse.ok
            ? yield put(TodoListActions.deleteTodoItemSuccess(newItems, newItemsInProcess))
            : yield put(TodoListActions.deleteTodoItemFailure(itemsResponse.error, newItemsInProcess));
    } catch (e) {
        yield call(TodoListActions.deleteTodoItemFailure, e, newItemsInProcess);
    }
}

/**
 * Updates todo item from the list of todos on fake API server.
 * API server is fake and nothing happens on server,
 * but we fake update in case of successful response and update item locally
 * @param store
 * @param action
 */
function* completeItem(store, action) {
    const {item} = action.payload;

    // Copying item to perform update.
    const updatedItem = {...item};
    const itemsInProcess = yield select(TodoListActions.selectors.getItemsInProcessIds);
    const newItemsInProcess = itemsInProcess.filter((currItem) => currItem !== item.id);

    try {
        updatedItem.completed = true;

        const itemsResponse = yield updateTodo(updatedItem);
        if(!itemsResponse.ok) {
            yield put(TodoListActions.completeTodoItemFailure(itemsResponse.error, newItemsInProcess));
            return;
        }

        const items = yield select(TodoListActions.selectors.getItems);

        // Mapping is used here, because of the way API updates items. No update happens for real.
        // In case of true API we would make another call to fetch the new array from server
        const newItems = items.map((currItem) => {
            if(currItem.id === item.id) {
                currItem = {...updatedItem};
            }

            return currItem;
        });

        yield put(TodoListActions.completeTodoItemSuccess(newItems, newItemsInProcess));
    } catch (e) {
        yield call(TodoListActions.completeTodoItemFailure, e, newItemsInProcess);
    }
}

export function* init(store, context) {
    yield all([
        takeLatest(TodoListActions.FETCH_TODO_ITEMS_REQUEST, fetchTodoList, store),
        takeEvery(TodoListActions.DELETE_TODO_ITEM_REQUEST, deleteTodoItem, store),
        takeEvery(TodoListActions.COMPLETE_TODO_ITEM_REQUEST, completeItem, store)
    ]);
}
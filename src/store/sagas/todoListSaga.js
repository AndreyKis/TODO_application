import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'

import * as TodoListActions from '../actions/todoListActions'
import * as API from '../../helpers/todoApi'

//FUNCTIONS TO CONNECT TO ACTIONS
/**
 * Retrieves the whole list of todos
 * @param store
 * @param action
 */
function* fetchTodoList(store, action) {
    try {
        const itemsResponse = yield API.getTodos();

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
    const {item} = action.payload;

    try {
        const itemsResponse = yield API.deleteTodo(item.id);
        const newItemsInProcess = yield getNewItemsInProcess(item.id);

        const items = yield select(TodoListActions.selectors.getItems);

        // Filtering is used here, because of the way API deletes items. No delete happens for real.
        // In case of true API we would make another call to fetch the new array from server
        const newItems = items.filter((currItem) => currItem.id !== item.id);

        itemsResponse.ok
            ? yield put(TodoListActions.deleteTodoItemSuccess(newItems, newItemsInProcess))
            : yield put(TodoListActions.deleteTodoItemFailure(itemsResponse.error, newItemsInProcess));
    } catch (e) {
        const newItemsInProcess = yield getNewItemsInProcess(item.id);

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

    try {
        updatedItem.completed = true;

        const itemsResponse = yield API.updateTodo(updatedItem);
        const newItemsInProcess = yield getNewItemsInProcess(item.id);

        if (!itemsResponse.ok) {
            yield put(TodoListActions.completeTodoItemFailure(itemsResponse.error, newItemsInProcess));
            return;
        }

        const items = yield select(TodoListActions.selectors.getItems);

        // Mapping is used here, because of the way API updates items. No update happens for real.
        // In case of true API we would make another call to fetch the new array from server
        const newItems = items.map((currItem) => {
            if (currItem.id === item.id) {
                currItem = {...updatedItem};
            }

            return currItem;
        });

        yield put(TodoListActions.completeTodoItemSuccess(newItems, newItemsInProcess));
    } catch (e) {
        const newItemsInProcess = yield getNewItemsInProcess(item.id);

        yield call(TodoListActions.completeTodoItemFailure, e, newItemsInProcess);
    }
}

// HELPER FUNCTIONS
/**
 * Function to return an array of items in process,
 * based on the array from store and itemID which has already been processed.
 *
 * @param itemId An id of item, which has already been processed and needs o be removed from array
 */
function* getNewItemsInProcess(itemId) {
    const newItems = yield select(TodoListActions.selectors.getItemsInProcessIds);
    return newItems.filter((currItem) => currItem !== itemId);
}

/**
 *
 * @param store
 * @param context
 */
export function* init(store, context) {
    yield all([
        takeLatest(TodoListActions.FETCH_TODO_ITEMS_REQUEST, fetchTodoList, store),
        takeEvery(TodoListActions.DELETE_TODO_ITEM_REQUEST, deleteTodoItem, store),
        takeEvery(TodoListActions.COMPLETE_TODO_ITEM_REQUEST, completeItem, store)
    ]);
}
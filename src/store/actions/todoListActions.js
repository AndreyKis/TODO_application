import { createSelector } from "reselect";

export const FETCH_TODO_ITEMS_REQUEST = "FETCH_TODO_ITEMS_REQUEST";
export const FETCH_TODO_ITEMS_SUCCESS = "FETCH_TODO_ITEMS_SUCCESS";
export const FETCH_TODO_ITEMS_FAILURE = "FETCH_TODO_ITEMS_FAILURE";

export const DELETE_TODO_ITEM_REQUEST = "DELETE_TODO_ITEM_REQUEST";
export const DELETE_TODO_ITEM_SUCCESS = "DELETE_TODO_ITEM_SUCCESS";
export const DELETE_TODO_ITEM_FAILURE = "DELETE_TODO_ITEM_FAILURE";

// FETCH
/**
 * Function to identify the beginning of fetch process
 */
export function fetchTodoItems() {
    return {type: FETCH_TODO_ITEMS_REQUEST};
}
/**
 * Identifies successful fetch of the list of items
 * @param items
 */
export function itemsFetchSuccess(items) {
    return {
        type: FETCH_TODO_ITEMS_SUCCESS,
        payload: {items}
    }
}
/**
 * Identifies failed fetch of the list of items
 * @param reason
 */
export function itemsFetchFailure(reason) {
    return {
        type: FETCH_TODO_ITEMS_FAILURE,
        payload: {reason}
    }
}

// DELETE
/**
 * Function to identify the beginning of delete process
 */
export function deleteTodoItem(itemId) {
    return {
        type: DELETE_TODO_ITEM_REQUEST,
        payload: {itemId}
    };
}
/**
 * Identifies successful delete of an item
 * @param items
 */
export function deleteTodoItemSuccess(items) {
    return {
        type: DELETE_TODO_ITEM_SUCCESS,
        payload: {items}
    }
}
/**
 * Identifies failed delete of an item
 * @param reason
 */
export function deleteTodoItemFailure(reason) {
    return {
        type: DELETE_TODO_ITEM_FAILURE,
        payload: {reason}
    }
}


// SELECTORS
const getItems = (state) => state.todoListReducer.items;

export const selectors = {
    getItems: createSelector(
        [getItems], (state) => state
    )
};
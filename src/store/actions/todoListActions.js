import {createSelector} from "reselect";

export const FETCH_TODO_ITEMS_REQUEST = "FETCH_TODO_ITEMS_REQUEST";
export const FETCH_TODO_ITEMS_SUCCESS = "FETCH_TODO_ITEMS_SUCCESS";
export const FETCH_TODO_ITEMS_FAILURE = "FETCH_TODO_ITEMS_FAILURE";

export const DELETE_TODO_ITEM_REQUEST = "DELETE_TODO_ITEM_REQUEST";
export const DELETE_TODO_ITEM_SUCCESS = "DELETE_TODO_ITEM_SUCCESS";
export const DELETE_TODO_ITEM_FAILURE = "DELETE_TODO_ITEM_FAILURE";

export const COMPLETE_TODO_ITEM_REQUEST = "COMPLETE_TODO_ITEM_REQUEST";
export const COMPLETE_TODO_ITEM_SUCCESS = "COMPLETE_TODO_ITEM_SUCCESS";
export const COMPLETE_TODO_ITEM_FAILURE = "COMPLETE_TODO_ITEM_FAILURE";

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
export function deleteTodoItem(item) {
    return {
        type: DELETE_TODO_ITEM_REQUEST,
        payload: {item}
    };
}

/**
 * Identifies successful delete of an item
 * @param items
 * @param itemsInProcessIds
 */
export function deleteTodoItemSuccess(items, itemsInProcessIds) {
    return {
        type: DELETE_TODO_ITEM_SUCCESS,
        payload: {items, itemsInProcessIds}
    }
}

/**
 * Identifies failed delete of an item
 * @param reason
 * @param itemsInProcessIds
 */
export function deleteTodoItemFailure(reason, itemsInProcessIds) {
    return {
        type: DELETE_TODO_ITEM_FAILURE,
        payload: {reason, itemsInProcessIds}
    }
}

// UPDATE
/**
 * Function to identify the beginning of completing process
 */
export function completeTodoItem(item) {
    return {
        type: COMPLETE_TODO_ITEM_REQUEST,
        payload: {item}
    };
}

/**
 * Identifies successful complete of an item
 * @param items
 * @param itemsInProcessIds
 */
export function completeTodoItemSuccess(items, itemsInProcessIds) {
    return {
        type: COMPLETE_TODO_ITEM_SUCCESS,
        payload: {items, itemsInProcessIds}
    }
}

/**
 * Identifies failed complete of an item
 * @param reason
 * @param itemsInProcessIds
 */
export function completeTodoItemFailure(reason, itemsInProcessIds) {
    return {
        type: COMPLETE_TODO_ITEM_FAILURE,
        payload: {reason, itemsInProcessIds}
    }
}


// SELECTORS
const getItems = (state) => state.todoListReducer.items;
const getItemsInProcessIds = (state) => state.todoListReducer.itemsInProcessIds;

export const selectors = {
    getItems: createSelector(
        [getItems], (state) => state
    ),
    getItemsInProcessIds: createSelector(
        [getItemsInProcessIds], (state) => state
    )
};
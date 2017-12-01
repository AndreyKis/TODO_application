import * as TodoListActions from '../actions/todoListActions';

const initialState = {
    isLoading: false,
    itemsInProcessIds: [],
    currentPage: 1,
    perPage: 20,
    items: [],
    error: null
};

/**
 *
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case TodoListActions.FETCH_TODO_ITEMS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case TodoListActions.FETCH_TODO_ITEMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                items: action.payload.items
            };
        case TodoListActions.FETCH_TODO_ITEMS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        case TodoListActions.DELETE_TODO_ITEM_REQUEST:
        case TodoListActions.COMPLETE_TODO_ITEM_REQUEST:
            return {
                ...state,
                itemsInProcessIds: [...state.itemsInProcessIds, action.payload.item.id]
            };
        case TodoListActions.DELETE_TODO_ITEM_SUCCESS:
        case TodoListActions.COMPLETE_TODO_ITEM_SUCCESS:
            return {
                ...state,
                itemsInProcessIds: action.payload.itemsInProcessIds,
                items: action.payload.items
            };
        case TodoListActions.DELETE_TODO_ITEM_FAILURE:
        case TodoListActions.COMPLETE_TODO_ITEM_FAILURE:
            return {
                ...state,
                itemsInProcessIds: action.payload.itemsInProcessIds,
                error: action.payload.error
            };
        default:
            return state;
    }
};
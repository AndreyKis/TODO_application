import * as TodoListActions from '../actions/todoListActions';

const initialState = {
    isLoading: false,
    deletingItemId: null,
    items: [],
    error: null
};

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
            return {
                ...state,
                deletingItemId: action.payload.itemId
            };
        case TodoListActions.DELETE_TODO_ITEM_SUCCESS:
            return {
                ...state,
                deletingItemId: null,
                items: action.payload.items
            };
        case TodoListActions.DELETE_TODO_ITEM_FAILURE:
            return {
                ...state,
                deletingItemId: null,
                error: action.payload.error
            };
        default:
            return state;
    }
};
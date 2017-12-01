import {init as initTodoList} from './todoListSaga';

export default function* root(store) {
    yield initTodoList(store)
}
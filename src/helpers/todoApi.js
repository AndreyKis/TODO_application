import {post, get, del, put} from "./request";

export async function getTodos(){
    return await get("todos");
}

export async function getTodoById(todoId) {
    return await get(`todos/${todoId}`);
}

export async function postTodo(todo) {
    return await post("todos", todo);
}

export async function updateTodo(todo) {
    return await put(`todos/${todo.id}`, todo);
}

export async function deleteTodo(todoId) {
    return await del(`todos/${todoId}`);
}
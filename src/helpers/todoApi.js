import * as request from "./request";

/**
 *
 */
export async function getTodos() {
    return await request.get("todos");
}

/**
 *
 */
export async function getTodoById(todoId) {
    return await request.get(`todos/${todoId}`);
}

/**
 *
 */
export async function postTodo(todo) {
    return await request.post("todos", todo);
}

/**
 *
 */
export async function updateTodo(todo) {
    return await request.put(`todos/${todo.id}`, todo);
}

/**
 *
 */
export async function deleteTodo(todoId) {
    return await request.del(`todos/${todoId}`);
}
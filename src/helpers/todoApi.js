import {post, get, del} from "./request";

export async function getTodos(){
    return await get("todos");
}

export async function getTodoById(todoId) {
    return await get(`todos/${todoId}`);
}

export async function postTodo(todo) {
    return await post("todos", todo);
}

export async function deleteTodo(todoId) {
    console.log("Inside todo deleting. Id: ", todoId);
    return await del(`todos/${todoId}`);
}
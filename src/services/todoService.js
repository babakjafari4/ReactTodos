import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "todos/";

function todosUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getTodos() {
  return http.get(apiEndpoint);
}

export function postTodo(todo) {
  const body = { ...todo };
  return http.post(apiEndpoint, body);
}

export async function putTodo(todo) {
  return http.put(todosUrl(todo.id), todo);
}

export function deleteTodo(id) {
  return http.delete(todosUrl(id));
}

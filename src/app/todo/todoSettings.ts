import { Todo } from "./todoType";
export type TodoSettings = {
    limit: number,
    skip: number,
    todos: Todo[],
    total: number,
}
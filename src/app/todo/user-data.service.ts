import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Todo } from "./types/todoType";
import { User } from "./types/user";
@Injectable({
    providedIn: "root",
})
export class DataService{
    
    public currentUser$ = new ReplaySubject<User>(1);

    public currentTodos$ = new ReplaySubject<Todo[]>(1);

    public newTodo$ = new ReplaySubject<Todo>(1);

    public currentTodo$ = new ReplaySubject<Todo>(1);

    public updatedTodo$ = new ReplaySubject<Todo>(1);

    public setUser(user: User): void{
        this.currentUser$.next(user);
    }

    public setTodos(todos: Todo[]): void{
        this.currentTodos$.next(todos);
    }

    public setNewTodo(todo: Todo): void {
        this.newTodo$.next(todo);
    }

    public setCurrentTodo(todo: Todo): void {
        this.currentTodo$.next(todo);
    }

    public setUpdatedTodo(todo: Todo): void {
        this.updatedTodo$.next(todo);
    }
}

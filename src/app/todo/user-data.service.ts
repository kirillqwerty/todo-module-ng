import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Todo } from "./todoType";
import { User } from "./user";
@Injectable({
    providedIn: "root",
})
export class DataService{

    public currentUser$ = new ReplaySubject<User>(1);

    public currentTodos$ = new ReplaySubject<Todo[]>(1)

    public setUser(user: User): void{
        this.currentUser$.next(user);
    }

    public setTodos(todos: Todo[]): void{
        this.currentTodos$.next(todos);
    }

}

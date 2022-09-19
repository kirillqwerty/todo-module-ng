import { Injectable } from "@angular/core";
import { ReplaySubject, Subject } from "rxjs";
// import { FullUserInfo } from "../types/fullUserInfo";
import { fullUserInfoSettings } from "../types/fullUsersInfoSettings";
import { Todo } from "../types/todoType";
import { User } from "../types/user";

@Injectable()
export class DataStreamService{

    public currentUser$ = new ReplaySubject<User>(1);

    public currentTodos$ = new ReplaySubject<Todo[]>(1);

    public newTodo$ = new ReplaySubject<Todo>(1);

    public currentTodo$ = new ReplaySubject<Todo>(1);

    public updatedTodo$ = new ReplaySubject<Todo>(1);

    public isUpdatingMode$ = new ReplaySubject<boolean>(1);

    public allUsers$ = new ReplaySubject<fullUserInfoSettings>(1);

    public isUserInfoActive$ = new Subject<boolean>;

    public setUser(user: User): void {
        this.currentUser$.next(user);
    }

    public setTodos(todos: Todo[]): void {
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

    public setUpdatingMode(value: boolean): void {
        this.isUpdatingMode$.next(value);
    }

    public setAllUsers(users: fullUserInfoSettings): void {
        this.allUsers$.next(users);
    }

    public backToUsers(): void{
        this.isUserInfoActive$.next(false);
    }
}

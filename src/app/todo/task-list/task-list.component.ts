import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "../user-data.service";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";
import { User } from "../types/user";
import { Todo } from "../types/todoType";
import { Subscription } from "rxjs";


@Component({
    selector: "app-task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.css"],
    providers: [HttpService]
})
export class TaskListComponent implements OnInit, OnDestroy{

    // public user = { email: "atuny0@sohu.com",
    //                 firstName: "Terry",
    //                 gender: "male",
    //                 id: 1,
    //                 image: "https://robohash.org/hicveldicta.png",
    //                 lastName: "Medhurst", 
    //                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhdHVueTAiLCJlbWFpbCI6ImF0dW55MEBzb2h1LmNvbSIsImZpcnN0TmFtZSI6IlRlcnJ5IiwibGFzdE5hbWUiOiJNZWRodXJzdCIsImdlbmRlciI6Im1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vcm9ib2hhc2gub3JnL2hpY3ZlbGRpY3RhLnBuZyIsImlhdCI6MTY2MjkyMzQ4NiwiZXhwIjoxNjYyOTI3MDg2fQ.I8i9XfRyUO5aAaJUMjck-jF2LeAT5GCU3CpQX-loX6s",
    //                 username: "atuny0"};

    // public todos = [{id: 17, todo: "Create a cookbook with favorite recipes", completed: false, userId: 1},
    // {id: 18, todo: "Bake a pie with some friends", completed: false, userId: 1},
    // {id: 54, todo: "Start a daily journal", completed: false, userId: 1},
    // {id: 100, todo: "Learn a new programming language", completed: true, userId: 1},
    // {id: 141, todo: "Visit a nearby museum", completed: true, userId: 1}];

    public user?: User;
    public todos?: Todo[];

    private userSub?: Subscription;
    private todosSub?: Subscription;
    private newTodoSub?: Subscription;

    constructor(private userData: DataService,
        private httpService: HttpService,
        private router: Router) { }

    public getUsername(): string{
        return this.user?.username as string;
    }

    public ngOnInit(): void {
        this.userSub = this.userData.currentUser$.subscribe((data) => {this.user = data; console.log(this.user)});
        this.todosSub = this.userData.currentTodos$.subscribe((data) => {this.todos = data; console.log(this.todos)});
        this.newTodoSub = this.userData.newTodo$.subscribe((data) => {this.todos?.push(data); console.log(this.todos)});
    }

    public ngOnDestroy(): void {
        this.userSub?.unsubscribe();
        this.todosSub?.unsubscribe();
        this.newTodoSub?.unsubscribe();
    }

    public newTodo(): void {
        this.router.navigate(["todo/add-todo"]);
    }
}

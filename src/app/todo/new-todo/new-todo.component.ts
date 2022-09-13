import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "../services/http.service";
import { Todo } from "../types/todoType";
import { User } from "../types/user";
import { DataStreamService } from "../services/user-data-stream.service";
import { UserDataService } from "../services/user-data.service";

@Component({
    selector: "app-new-todo",
    templateUrl: "./new-todo.component.html",
    styleUrls: ["./new-todo.component.css"]
})

export class NewTodoComponent implements OnInit{

    public taskInput = new FormControl("", [Validators.required]);
    public user?: User;
    public todos?: Todo[];

    constructor(private router: Router,
                private httpService: HttpService,
                private userData: UserDataService,
                private dataStreamService: DataStreamService) { }

    public back(): void {
        this.router.navigate(["todo/todos"]);
    }

    public ngOnInit(): void {
        this.taskInput.valueChanges.subscribe(console.log);
        this.dataStreamService.currentUser$.subscribe((data) => {this.user = data; console.log(this.user)});
        this.dataStreamService.currentTodos$.subscribe((data) => {this.todos = data; console.log(this.todos)});
    }

    public addTodo(): void{
        this.httpService.addTodo(this.user?.id as number, this.taskInput.value as string).subscribe({
            next: (data: Todo) => {
                data.completed = false;
                console.log("this is form http service")
                console.log(data);
                data.usermade = true;
                this.userData.currentTodos?.push(data);
                this.router.navigate(["todo/todos"]);
            },
            error: () => {console.log("error")}
        });
    }

}

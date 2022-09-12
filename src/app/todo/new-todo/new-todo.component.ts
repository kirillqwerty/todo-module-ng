import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "../http.service";
import { Todo } from "../types/todoType";
import { User } from "../types/user";
import { DataService } from "../user-data.service";

@Component({
    selector: "app-new-todo",
    templateUrl: "./new-todo.component.html",
    styleUrls: ["./new-todo.component.css"],
    providers: [HttpService]
})
export class NewTodoComponent implements OnInit{

    public taskInput = new FormControl("", [Validators.required]);
    public user?: User;
    public todos?: Todo[];

    constructor(private router: Router,
                private httpService: HttpService,
                private userData: DataService) { }

    public back(): void {
        this.router.navigate(["todo/todos"]);
    }

    public ngOnInit(): void {
        this.taskInput.valueChanges.subscribe(console.log);
        this.userData.currentUser$.subscribe((data) => {this.user = data; console.log(this.user)});
        this.userData.currentTodos$.subscribe((data) => {this.todos = data; console.log(this.todos)});
    }

    public addTodo(): void{
        this.httpService.addTodo(this.user?.id as number, this.taskInput.value as string).subscribe({
            next: (data: Todo) => {
                data.completed = false;
                console.log("this is form http service")
                console.log(data);
                this.userData.setNewTodo(data);
                this.router.navigate(["todo/todos"]);
            },
            error: () => {console.log("error")}
        });
    }

}

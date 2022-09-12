import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "../http.service";
import { Todo } from "../types/todoType";
import { User } from "../types/user";
import { DataService } from "../user-data.service";

@Component({
  selector: "app-update-todo",
  templateUrl: "./update-todo.component.html",
  styleUrls: ["./update-todo.component.css"],
  providers: [HttpService]
})
export class UpdateTodoComponent implements OnInit {

    public taskInput = new FormControl("", [Validators.required]);
    public user?: User;
    public todo?: Todo;

    constructor(private router: Router,
        private httpService: HttpService,
        private userData: DataService) { }

    public ngOnInit(): void {
        this.taskInput.valueChanges.subscribe(console.log);
        this.userData.currentUser$.subscribe((data) => {this.user = data; console.log(this.user)});
        this.userData.currentTodo$.subscribe((data) => {this.todo = data; console.log(this.todo)});
        this.taskInput.setValue(this.todo?.todo as string); 
    }

    public back(): void {
        this.router.navigate(["todo/todos"]);
    }

    public update(): void {
        this.httpService.updateTodo(this.todo?.id as number, <string>this.taskInput.value).subscribe({
            next: (data: Todo) => {
                console.log(data);  
                this.userData.setUpdatedTodo(data);
                this.router.navigate(["todo/todos"]);
            },
            error: () => { console.log("error"); }
        });
    }

}
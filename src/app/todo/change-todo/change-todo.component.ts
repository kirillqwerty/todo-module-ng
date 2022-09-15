import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "../services/http.service";
import { Todo } from "../types/todoType";
import { User } from "../types/user";
import { DataStreamService } from "../services/user-data-stream.service";
import { UserDataService } from "../services/user-data.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-change-todo",
    templateUrl: "./change-todo.component.html",
    styleUrls: ["./change-todo.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChangeTodoComponent implements OnInit, OnDestroy{

    public taskInput = new FormControl("", [Validators.required]);
    public user?: User;
    public todos?: Todo[];
    public todo?: Todo;

    public btnAllow = true;

    public headerLabelText = "";
    public buttonText = "";

    private userSub?: Subscription;
    private todosSub?: Subscription;
    private todoSub?: Subscription;
    private isUpdatingModeSub?: Subscription;
    private isUpdatingTodoMode = false;

    constructor(private router: Router,
                private httpService: HttpService,
                private userData: UserDataService,
                private dataStreamService: DataStreamService) { }
    
    public back(): void {
        this.router.navigate(["todo/todos"]);
    }

    public ngOnInit(): void {
        this.taskInput.valueChanges.subscribe(console.log);
        this.userSub = this.dataStreamService.currentUser$.subscribe((data) => {
            this.user = data; 
            console.log(this.user)
        });
        // this.todosSub = this.dataStreamService.currentTodos$.subscribe((data) => {this.todos = data; console.log(this.todos)});
        
        this.todoSub = this.dataStreamService.currentTodo$.subscribe((data) => {
            this.todo = data; 
            console.log(this.todo);
        });

        this.dataStreamService.isUpdatingMode$.subscribe((value) => {
            if (value) {
                this.headerLabelText = "Update Todo";
                this.buttonText = "Update";  
                this.taskInput.setValue(this.todo?.todo as string); 
            } else {
                this.headerLabelText = "New Todo";
                this.buttonText = "Add";
            }
            console.log(value);
            this.isUpdatingTodoMode = value;
        });
    }

    public ngOnDestroy(): void {
        this.userSub?.unsubscribe();
        // this.todosSub?.unsubscribe();
        this.isUpdatingModeSub?.unsubscribe();
        this.todoSub?.unsubscribe();
    }

    public changeTodos(): void {
        this.btnAllow = false;
        if (this.isUpdatingTodoMode) {
            this.updateTodo();
        } else {
            // this.headerLabelText = "New Todo";
            // this.buttonText = "Add";
            this.addTodo();
        }
    }   

    public addTodo(): void{
        this.httpService.addTodo(this.user?.id as number, this.taskInput.value as string).subscribe({
            next: (data) => {
                data.completed = false;
                console.log("this is form http service")
                console.log(data);
                data.usermade = true;
                this.userData.currentTodos?.push(data);
                this.router.navigate(["todo/todos"]);
                this.btnAllow = true;
            },
            error: () => {
                console.log("error");
                this.btnAllow = true;
            }
        });
    }

    public updateTodo(): void {
        this.httpService.updateTodo(this.todo?.id as number, <string>this.taskInput.value).subscribe({
            next: (data: Todo) => {
                console.log(data);  
                this.dataStreamService.setUpdatedTodo(data);
                this.router.navigate(["todo/todos"]);
                this.btnAllow = true;
            },
            error: () => { 
                console.log("error"); 
                this.btnAllow = true;
            }
        });
    }


}

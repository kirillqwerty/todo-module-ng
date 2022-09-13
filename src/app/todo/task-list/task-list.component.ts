import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStreamService } from "../services/user-data-stream.service";
import { HttpService } from "../services/http.service";
import { Router } from "@angular/router";
import { User } from "../types/user";
import { Todo } from "../types/todoType";
import { Subscription } from "rxjs";
import { UserDataService } from "../services/user-data.service";
import { FormControl, FormGroup } from "@angular/forms";
import { CanActivateGuard } from "../can-activate.guard";


@Component({
    selector: "app-task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.css"],
    providers: [HttpService, CanActivateGuard]
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

    // public todos = [{id: 17, todo: "Create a cookbook with favorite recipes", completed: false, userId: 1, usermade: false},
    // {id: 18, todo: "Bake a pie with some friends", completed: false, userId: 1, usermade: false},
    // {id: 54, todo: "Start a daily journal", completed: false, userId: 1, usermade: false},
    // {id: 100, todo: "Learn a new programming language", completed: true, userId: 1, usermade: false},
    // {id: 141, todo: "Visit a nearby museum", completed: true, userId: 1, usermade: false}];

    public user?: User;
    public todos?: Todo[];

    public taskToDelete?: Todo;

    public confirmationForm = new FormGroup({
        yesBtn: new FormControl(false)
    }) 
        

    public isConfirmation = false;
    private userSub?: Subscription;
    private updatedTodoSub?: Subscription;

    constructor(private userDataStream: DataStreamService,
        private httpService: HttpService,
        private router: Router,
        private dataService: UserDataService) { }

    public getUsername(): string{
        return this.user?.username as string;
    }

    public ngOnInit(): void {
        console.log(this.isConfirmation);
        this.userSub = this.userDataStream.currentUser$.subscribe((data) => {this.user = data; console.log(this.user)});
        this.todos = this.dataService.currentTodos;
        console.log(this.todos);
        this.confirmationForm.valueChanges.subscribe(() => this.deleteTodo());
        this.updatedTodoSub = this.userDataStream.updatedTodo$.subscribe((data) => this.updateTask(data));  
        console.log(this.isConfirmation);
    }

    public ngOnDestroy(): void {
        console.log("not emtpy");
        this.userSub?.unsubscribe();
        this.updatedTodoSub?.unsubscribe();
    }

    public newTodo(): void {
        this.router.navigate(["todo/add-todo"]);
    }

    public toUpdatePage(todo: Todo): void {
        this.userDataStream.setCurrentTodo(todo);
        this.router.navigate(["todo/update-todo"]);
    }

    public back(): void {
        this.router.navigate(["todo/login"]);
    }

    public updateTask(todo: Todo): void {
        console.log(todo);
        for (const task of this.todos as Todo[]) {
            if (task.id == todo.id) {
                task.todo = todo.todo;
            }
        }
    }

    public setTaskToDelete(todo: Todo): void {
        this.taskToDelete = todo;
        this.isConfirmation = true;
    }

    public deleteTodo(): void {
        // this.isConfirmation = true;
        if (this.confirmationForm.value.yesBtn) {
            if (this.taskToDelete!== undefined){
                this.httpService.deleteTodo(this.taskToDelete.id).subscribe({
                    next: (data: any) => { 
                        console.log(data);
                        if (this.taskToDelete!== undefined){
                        this.dataService.currentTodos?.splice(this.dataService.currentTodos.indexOf(this.taskToDelete), 1)
                        // setTimeout(() => {
                        //     this.confirmationForm.setValue({yesBtn: false});
                        // }, 1000); 
                        }
                    }
                })
            }
        }
    }
}

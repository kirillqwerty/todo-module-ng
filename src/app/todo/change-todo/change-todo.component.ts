import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "../services/http.service";
import { Todo } from "../types/todoType";
import { User } from "../types/user";
import { DataStreamService } from "../services/user-data-stream.service";
import { UserDataService } from "../services/user-data.service";
import { Subject, takeUntil } from "rxjs";

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

    private readonly unsubscribe$: Subject<void> = new Subject();

    private isUpdatingTodoMode = false;

    constructor(private router: Router,
                private httpService: HttpService,
                private userData: UserDataService,
                private dataStreamService: DataStreamService,
                private cdr: ChangeDetectorRef) { }
    
    public back(): void {
        this.router.navigate(["todo/todos"]);
    }

    public ngOnInit(): void {
        this.taskInput.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(console.log);
            
        this.dataStreamService.currentUser$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                this.user = data; 
                console.log(this.user)
            });
        
        this.dataStreamService.currentTodo$            
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                this.todo = data; 
                console.log(this.todo);
            });

        this.dataStreamService.isUpdatingMode$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((value) => {
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

    public changeTodos(): void {
        this.btnAllow = false;
        if (this.isUpdatingTodoMode) {
            this.updateTodo();
        } else this.addTodo();
    }   

    public addTodo(): void{
        this.httpService.addTodo(this.user?.id as number, this.taskInput.value as string)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
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
                    this.cdr.detectChanges();
                },
            });
    }

    public updateTodo(): void {
        this.httpService.updateTodo(this.todo?.id as number, <string>this.taskInput.value)            
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: (data: Todo) => {
                    console.log(data);  
                    this.dataStreamService.setUpdatedTodo(data);
                    this.router.navigate(["todo/todos"]);
                    this.btnAllow = true;
                },
                error: () => { 
                    console.log("error"); 
                    this.btnAllow = true;
                    this.cdr.detectChanges();
                }
            });
    }
    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();      
    }
}

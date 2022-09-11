import { Component, OnInit } from "@angular/core";
import { DataService } from "../user-data.service";
import { HttpService } from "../http.service";
import { User } from "../user";
import { Todo } from "../todoType";


@Component({
    selector: "app-task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.css"],
    providers: [HttpService]
})
export class TaskListComponent implements OnInit {

    public user?: User;

    public todos: Todo[] = []; 

    constructor(private userData: DataService,
        private httpService: HttpService) { }

    // public getUsername(): string{
    //     return "nickname";
    // }

    // public todosList(): unknown{
    //     return Object.values(this.todos);
    // }

    public getUsername(): string{
        return this.user?.username as string;
    }

    public ngOnInit(): void {
        this.userData.currentUser$.subscribe((data) => {this.user = data; console.log(this.user)});
        this.userData.currentTodos$.subscribe((data) => {this.todos = data; console.log(this.todos[0])});
    }

}

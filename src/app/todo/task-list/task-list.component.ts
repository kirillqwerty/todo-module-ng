import { Component, OnInit } from "@angular/core";
import { DataService } from "../user-data.service";

@Component({
    selector: "app-task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.css"],
})
export class TaskListComponent implements OnInit {

    constructor(private userData: DataService) { }

    public ngOnInit(): void {
        this.userData.currentUser$.subscribe((data) => console.log(data))
    }

    

}

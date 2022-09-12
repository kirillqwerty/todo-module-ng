import { Injectable } from "@angular/core";
import { Todo } from "../types/todoType";
// import { User } from "../types/user";
import { DataStreamService } from "./user-data-stream.service";

@Injectable({
    providedIn: "root",
})

export class UserDataService{

    public currentTodos?: Todo[];

    constructor(public dataStreamService: DataStreamService){

    }

}

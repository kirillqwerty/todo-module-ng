import { Injectable } from "@angular/core";
import { Todo } from "../types/todoType";
// import { User } from "../types/user";
import { DataStreamService } from "./user-data-stream.service";

@Injectable()
export class UserDataService{

    public currentTodos?: Todo[];

    public isAuth = false;

    constructor(public dataStreamService: DataStreamService){

    }

}

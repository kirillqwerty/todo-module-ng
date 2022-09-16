import { Injectable } from "@angular/core";
import { FullUserInfo } from "../types/fullUserInfo";
import { Todo } from "../types/todoType";
// import { User } from "../types/user";
import { DataStreamService } from "./user-data-stream.service";

@Injectable()
export class UserDataService{

    public currentTodos?: Todo[];

    public userInfo?: FullUserInfo;

    constructor(public dataStreamService: DataStreamService){

    }

}

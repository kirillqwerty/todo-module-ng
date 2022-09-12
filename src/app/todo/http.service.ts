import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataToLogin } from "./types/dataToLogin";

@Injectable()
export class HttpService{

    constructor(private http: HttpClient){}

    public signIn(user: DataToLogin): any {

        const body = {
            username: user.username,
            password: user.password
        };

        return this.http.post("https://dummyjson.com/auth/login", body);
    }

    public getTodosById(id: number): any {
        return this.http.get(`https://dummyjson.com/todos/user/${id}`);
    }

    public addTodo(id: number, task: string): any {

        const body = {
            todo: task,
            complted: false,
            userId: id
        }

        return this.http.post("https://dummyjson.com/todos/add", body);
    }
    
    public updateTodo(taskId: number, task: string): any {
        const body = {
            todo: task,
        }

        return this.http.put(`https://dummyjson.com/todos/${taskId}`, body);
    }
}

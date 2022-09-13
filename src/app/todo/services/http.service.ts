import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataToLogin } from "../types/dataToLogin";
import { Observable } from "rxjs";
import { User } from "../types/user";
import { Todo } from "../types/todoType";
import { TodoSettings } from "../types/todoSettings";

@Injectable()
export class HttpService{

    constructor(private http: HttpClient){}

    public signIn(user: DataToLogin): Observable<User> {

        const body = {
            username: user.username,
            password: user.password
        };

        return this.http.post<User>("https://dummyjson.com/auth/login", body);
    }

    public getTodosById(id: number): Observable<TodoSettings> {
        return this.http.get<TodoSettings>(`https://dummyjson.com/todos/user/${id}`);
    }

    public addTodo(id: number, task: string): Observable<Todo> {

        const body = {
            todo: task,
            complted: false,
            userId: id
        }

        return this.http.post<Todo>("https://dummyjson.com/todos/add", body);
    }
    
    public updateTodo(taskId: number, task: string): Observable<Todo> {
        const body = {
            todo: task,
        }

        return this.http.put<Todo>(`https://dummyjson.com/todos/${taskId}`, body);
    }

    public deleteTodo(taskId: number): Observable<Todo>{
        return this.http.delete<Todo>(`https://dummyjson.com/todos/${taskId}`);
    }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataToLogin } from "../types/dataToLogin";
import { Observable } from "rxjs";
import { User } from "../types/user";
import { Todo } from "../types/todoType";
import { TodoSettings } from "../types/todoSettings";
import { AuthService } from "./auth-service.service";

@Injectable()
export class HttpService{

    constructor(private http: HttpClient,
                private authService: AuthService){}

    public signIn(user: DataToLogin): Observable<User> {

        const body = {
            username: user.username,
            password: user.password
        };

        return this.http.post<User>("https://dummyjson.com/auth/login", body);
    }

    public getTodosById(id: number): Observable<TodoSettings> {     
        return this.http.get<TodoSettings>(`api/auth/todos/user/${id}`, { withCredentials: true });
    }

    public addTodo(id: number, task: string): Observable<Todo> {

        const body = {
            todo: task,
            complted: false,
            userId: id
        }
        return this.http.post<Todo>("api/todos/add", body, { withCredentials: true });
    }

    public updateTodo(taskId: number, task: string): Observable<Todo> {

        const body = {
            todo: task,
        }

        return this.http.put<Todo>(`api/todos/${taskId}`, body, { withCredentials: true });
    }

    public deleteTodo(taskId: number): Observable<Todo>{
        return this.http.delete<Todo>(`api/todos/${taskId}`, { withCredentials: true });
    }
}

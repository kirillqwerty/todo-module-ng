import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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

        // const headers = new HttpHeaders({
        //     "Content-Type": "application/json",
        //     "Authorization": `Bearer ${this.authService.getToken()}`
        // })

        // const requestOptions = { 
        //     headers: headers 
        // };
        
        return this.http.get<TodoSettings>(`https://dummyjson.com/todos/user/${id}`);
    }

    public addTodo(id: number, task: string): Observable<Todo> {

        const body = {
            todo: task,
            complted: false,
            userId: id
        }

        // const headers = new HttpHeaders({
        //     "Content-Type": "application/json",
        //     "Authorization": `Bearer ${this.authService.getToken()}`
        // })

        // const requestOptions = { 
        //     headers: headers, 
        //     body: body
        // };

        return this.http.post<Todo>("https://dummyjson.com/todos/add", body);
    }

    public updateTodo(taskId: number, task: string): Observable<Todo> {

        const body = {
            todo: task,
        }

        // const headers = new HttpHeaders({
        //     "Content-Type": "application/json",
        //     "Authorization": `Bearer ${this.authService.getToken()}`
        // })

        // const requestOptions = { 
        //     headers: headers, 
        //     body: body
        // };

        return this.http.put<Todo>(`https://dummyjson.com/todos/${taskId}`, body);
    }

    public deleteTodo(taskId: number): Observable<Todo>{
        // const headers = new HttpHeaders({
        //     "Content-Type": "application/json",
        //     "Authorization": `Bearer ${this.authService.getToken()}`
        // })

        // const requestOptions = { 
        //     headers: headers 
        // };

        return this.http.delete<Todo>(`https://dummyjson.com/todos/${taskId}`);
    }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataToLogin } from "../types/dataToLogin";
import { Observable } from "rxjs";
import { User } from "../types/user";
import { Todo } from "../types/todoType";
import { TodoSettings } from "../types/todoSettings";
// import { FullUserInfo } from "../types/fullUserInfo";
import { fullUserInfoSettings } from "../types/fullUsersInfoSettings";
import { FullUserInfo } from "../types/fullUserInfo";

@Injectable()
export class HttpService{

    constructor(private http: HttpClient,){}

    public signIn(user: DataToLogin): Observable<User> {

        const body = {
            username: user.username,
            password: user.password
        };

        return this.http.post<User>("api/auth/login", body);
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
        return this.http.post<Todo>("api/auth/todos/add", body, { withCredentials: true });
    }

    public updateTodo(taskId: number, task: string): Observable<Todo> {

        const body = {
            todo: task,
        }

        return this.http.put<Todo>(`api/auth/todos/${taskId}`, body, { withCredentials: true });
    }

    public getUsers(limit: number, skip: number): Observable<fullUserInfoSettings>{
        return this.http.get<fullUserInfoSettings>(`api/auth/users?limit=${limit}&skip=${skip}`, { withCredentials: true });
    }

    public getUserInfo(id: number): Observable<FullUserInfo>{
        return this.http.get<FullUserInfo>(`api/auth/users/${id}`, { withCredentials: true})
    }

    public deleteTodo(taskId: number): Observable<Todo>{
        return this.http.delete<Todo>(`api/auth/todos/${taskId}`, { withCredentials: true });
    }

    // public getUserImage(name: string): 
}

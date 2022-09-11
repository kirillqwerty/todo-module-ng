import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataToLogin } from "./dataToLogin";

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
}

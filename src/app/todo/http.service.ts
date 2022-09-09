import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user";


@Injectable()
export class httpService{

    constructor(private http: HttpClient){}

    public signIn(user: User): any{

        const body = {
            username: user.username,
            password: user.password
        };

        return this.http.post("https://dummyjson.com/auth/login", body)
    }
}

import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    
    private token = "";

    // constructor() {
    // }

    public get Token(): string {
        return this.token;
    }

    public set Token(token: string){
        this.token = token;
    }
}

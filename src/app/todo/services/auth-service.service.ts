import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    
    public token = "";

    // constructor() {
    // }

    public getToken(): string {
        return this.token;
    }

    public setToken(token: string): void {
        this.token = token;
    }
}

import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth-service.service";

@Injectable({
    providedIn: "root"
})
export class CanActivateGuard implements CanActivate {

    constructor( public router: Router,
        public authService: AuthService){}

    public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.token) {
            return true;    
        }
        this.router.navigate(["todo/login"])
        return false;
    }
  
}

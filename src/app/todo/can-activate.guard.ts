import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CanActivateGuard implements CanActivate {

    public userLoggedIn = false;

    constructor( public router: Router){}

    public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.userLoggedIn) {
            return true;    
        }
        this.router.navigate(["todo/login"])
        return false;
    }
  
}

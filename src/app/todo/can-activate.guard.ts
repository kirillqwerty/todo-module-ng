import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserDataService } from "./services/user-data.service";

@Injectable({
    providedIn: "root"
})
export class CanActivateGuard implements CanActivate {

    constructor( public router: Router,
                public dataService: UserDataService){}

    public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.dataService.isAuth) {
            return true;    
        }
        this.router.navigate(["todo/login"])
        return false;
    }
  
}

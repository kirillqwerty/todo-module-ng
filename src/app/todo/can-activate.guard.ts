import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { DataStreamService } from "./services/user-data-stream.service";

@Injectable({
    providedIn: "root"
})
export class CanActivateGuard implements CanActivate {

    constructor( public router: Router,
                public dataService: DataStreamService){}

    public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.dataService.currentUser$) {
            return true;    
        }
        this.router.navigate(["todo/login"])
        return false;
    }
  
}

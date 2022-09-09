import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class DataService{

    public currentUser$ = new ReplaySubject<unknown>(1);

    public setUser(user: unknown): void{
        this.currentUser$.next(user);
    }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { HttpService } from "../services/http.service";
import { DataStreamService } from "../services/user-data-stream.service";
import { UserDataService } from "../services/user-data.service";
import { FullUserInfo } from "../types/fullUserInfo";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {

    public data?: FullUserInfo[];

    // public isPopUpActive = false;

    public isPopUpActive = false;

    public loading = false;

    // public data = [
    //     {id: 1111, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
    //     {id: 2222, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
    //     {id: 3333, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
    //     {id: 4444, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
    //     {id: 5555, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
    //     {id: 6666, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
    //     {id: 7777, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
    //     {id: 8888, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
    //     {id: 9999, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
    //     {id: 42314, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
    //     {id: 434324, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
    //     {id: 8567, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
    //     {id: 37334, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.01.2000"},
        
    // ]

    public pages?: number;

    private readonly unsubscribe$: Subject<void> = new Subject();

    constructor(private router: Router,
                private httpService: HttpService,
                private userDataStream: DataStreamService,
                private cdr: ChangeDetectorRef,
                private userData: UserDataService) { }

    public ngOnInit(): void {
        this.userDataStream.allUsers$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                this.data = data;
                console.log(data);
            })

        this.userDataStream.isUserInfoActive$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((condition) => {
                this.isPopUpActive = condition;
            })

        this.cdr.detectChanges();
    }

    public goToTodos(): void {
        this.router.navigate(["todo/todos"])
    }

    public back(): void {
        this.router.navigate(["todo/login"])
    }

    public showInfo(id: number): void {
        this.loading = true;
        console.log(this.isPopUpActive);
        this.httpService.getUserInfo(id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: (data) => {
                    this.userData.userInfo = data;
                    console.log(this.userData.userInfo);
                    this.isPopUpActive = true;
                    console.log(this.isPopUpActive);
                    this.loading = false;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.loading = false;   
                    console.log("error")
                }
            })
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

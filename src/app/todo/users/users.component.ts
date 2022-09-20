import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
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

    public userInfo?: FullUserInfo[];
// public userInfo = [
//         {id: 1, firstName: "asdfas", lastName: "d12d12d12d", username: "121212", password: "fasdfdfsadf", birthDate: "12.01.2000"},
//         {id: 2, firstName: "2323ffs", lastName: "fsdafsad", username: "asdfsadf", password: "d3d3d31d", birthDate: "12.02.2000"},
//         {id: 3, firstName: "csacsacdas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.03.2000"},
//         {id: 2, firstName: "asdfas", lastName: "d1d12", username: "asdfsadf", password: "d3d3d12d", birthDate: "12.04.2000"},
//         {id: 1, firstName: "ww", lastName: "fsdafsad", username: "zvzxcvzx", password: "fasdfdfsadf", birthDate: "12.05.2000"},
//         {id: 1, firstName: "eqweqw", lastName: "fsdafsad", username: "asdfsadf", password: "ddsa213d3d21", birthDate: "12.06.2000"},
//         {id: 12, firstName: "4343", lastName: "d21", username: "cdsaccsadc", password: "fasdfdfsadf", birthDate: "12.07.2000"},
//         {id: 12, firstName: "eeee", lastName: "d21d12d12", username: "zxcvzxv", password: "fasdfdfsadf", birthDate: "12.08.2000"},
//         {id: 12, firstName: "asdfas", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.09.2000"},
//         {id: 12, firstName: "ddddafcadv", lastName: "21d12d12d", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.10.2000"},
//         {id: 12, firstName: "cd", lastName: "fsdafsad", username: "asdfsadf", password: "fasdfdfsadf", birthDate: "12.11.2000"},
//         {id: 12, firstName: "asdfas", lastName: "fsdafsad", username: "vaasdv", password: "12d321d123d", birthDate: "12.12.2000"},
//         {id: 12, firstName: "asdfas", lastName: "d12", username: "211212", password: "fasdfdfsadf", birthDate: "12.01.2000"},
        
//     ]

    public isPopUpActive = false;

    public loading = false;

    public pagesNumber: number[] = [];

    // public pagesNumber: number[] = [1,2,3,4,5,6,7,8,9,10];

    public currentPage = 1;
    
    public selectedSet = new FormControl(10, [Validators.required]);

    public pageSet = [10,20,50];

    public listSize = 10;

    public totalUsers?: number;

    private readonly unsubscribe$: Subject<void> = new Subject();

    constructor(private router: Router,
                private httpService: HttpService,
                private userDataStream: DataStreamService,
                private cdr: ChangeDetectorRef,
                private userData: UserDataService) { }

    public ngOnInit(): void {
        this.selectedSet.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                this.listSize = data as number;
                this.pagesNumber = [];
                console.log(this.listSize);
                if (this.totalUsers) {
                    for (let i = 1; i <= this.totalUsers/this.listSize; i++) {                    
                        this.pagesNumber?.push(i);
                    }    
                }
                this.currentPage = 1;
                this.openNewPage()
                this.cdr.detectChanges();
            })    

        this.userDataStream.allUsers$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                this.totalUsers = data.total;
                this.pagesNumber = [];
                console.log(data.total);
                for (let i = 1; i <= data.total/this.listSize; i++) {                    
                    this.pagesNumber?.push(i);
                }
                this.userInfo = data.users;
                console.log(this.pagesNumber);
                this.cdr.detectChanges();
            })

        this.userDataStream.isUserInfoActive$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((condition) => {
                this.isPopUpActive = condition;
                this.cdr.detectChanges();
            })
        // this.cdr.detectChanges();
    }

    public goToTodos(): void {
        this.router.navigate(["todo/todos"])
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
                    this.cdr.detectChanges();
                }
            })
            // this.cdr.detectChanges();
    }

    public setCurrentPage(index: number): void {
        this.currentPage = index;
        console.log(this.currentPage);
        this.openNewPage()
        this.cdr.detectChanges();
    }

    public openNewPage(): void{
        this.loading = true;
        this.httpService.getUsers(this.listSize, this.listSize*(this.currentPage - 1))
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: (data) => {
                    console.log(data);
                    this.userInfo = data.users;
                    this.loading = false;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.loading = false;
                    console.log("error");
                    this.cdr.detectChanges();
                }
            })
        
    }

    public nextPage(): void {
        if (this.currentPage < this.pagesNumber[this.pagesNumber.length - 1]) {
            this.currentPage++;
            this.openNewPage();    
        }
    }

    public previousPage(): void {
        if (this.currentPage > this.pagesNumber[0]) {
            this.currentPage--;
            this.openNewPage();    
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

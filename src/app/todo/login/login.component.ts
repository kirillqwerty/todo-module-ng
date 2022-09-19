import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpService } from "../services/http.service";
import { DataToLogin } from "../types/dataToLogin";
import { Router } from "@angular/router";
import { DataStreamService } from "../services/user-data-stream.service";
import { UserDataService } from "../services/user-data.service";
import { AuthService } from "../services/auth-service.service";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit, OnDestroy{

    public loginForm = this.fb.group({
        login: [<string | null> "", [Validators.required]],
        password: [<string | null> "", [Validators.required]]
    })

    public loading = false;

    private readonly unsubscribe$: Subject<void> = new Subject();


    constructor(private fb: FormBuilder,
                private httpService: HttpService,
                private router: Router,
                private dataStreamService: DataStreamService,
                private userData: UserDataService,
                private authService: AuthService) { }
    
    public signIn(): void{

        this.loading = true;

        const user: DataToLogin = {
            username: this.loginForm.value.login as string,
            password: this.loginForm.value.password as string
        }

        this.httpService.signIn(user)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
                next: (data) => {    
                    console.log(data);
                    this.dataStreamService.setUser(data);
                    this.authService.token = data.token;

                    this.httpService.getTodosById(data.id)
                        .pipe(takeUntil(this.unsubscribe$))
                        .subscribe({
                            next: (data) => {
                                for (const todo of data.todos) {
                                    todo.usermade = false;
                                }
                                this.userData.currentTodos = data.todos;
                                console.log(this.userData.currentTodos);
                                this.loading = false;
                                this.router.navigate(["todo/todos"]);
                            }
                        });

                },
                error: () => {
                    this.loading = false;
                    this.loginForm.setValue({login: "", password: ""});                
                    alert("try again");
                }
            })
    }

    public ngOnInit(): void {
        this.loginForm.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(console.log);    
    }    

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}

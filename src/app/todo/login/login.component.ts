import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpService } from "../services/http.service";
import { DataToLogin } from "../types/dataToLogin";
import { Router } from "@angular/router";
import { DataStreamService } from "../services/user-data-stream.service";
import { UserDataService } from "../services/user-data.service";
import { AuthService } from "../services/auth-service.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit {

    public loginForm = this.fb.group({
        login: [<string | null> "", [Validators.required]],
        password: [<string | null> "", [Validators.required]]
    })
    
    constructor(private fb: FormBuilder,
                private httpService: HttpService,
                private router: Router,
                private dataStreamService: DataStreamService,
                private userData: UserDataService,
                private authService: AuthService) { }



    public signIn(): void{

        const user: DataToLogin = {
            username: this.loginForm.value.login as string,
            password: this.loginForm.value.password as string
        }

        this.httpService.signIn(user).subscribe({
            next: (data) => {    
                console.log(data);
                this.dataStreamService.setUser(data);
                this.authService.token = data.token;
                this.httpService.getTodosById(data.id).subscribe({
                    next: (data) => {
                        for (const todo of data.todos) {
                            todo.usermade = false;
                        }
                        this.userData.currentTodos = data.todos;
                        console.log(this.userData.currentTodos);
                    }
                });

                setTimeout(() => {
                    this.router.navigate(["todo/todos"]);
                }, 1000);
                
            },
            error: () => {
                this.loginForm.setValue({login: "", password: ""})
                this.loginForm.markAsUntouched;
                alert("try again");
            }
        });
    }

    public ngOnInit(): void {
        this.loginForm.valueChanges.subscribe(console.log);    
    }

    

}

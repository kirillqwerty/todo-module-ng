import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpService } from "../http.service";
import { DataToLogin } from "../dataToLogin";
import { Router } from "@angular/router";
import { DataService } from "../user-data.service";
import { User } from "../user";
import { TodoSettings } from "../todoSettings";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    providers: [HttpService]
})
export class LoginComponent implements OnInit {

    public loginForm = this.fb.group({
        login: [<string | null> "", [Validators.required]],
        password: [<string | null> "", [Validators.required]]
    })
    
    constructor(private fb: FormBuilder,
                private httpService: HttpService,
                private router: Router,
                private dataService: DataService) { }


    public signIn(): void{

        const user: DataToLogin = {
            username: this.loginForm.value.login as string,
            password: this.loginForm.value.password as string
        }

        this.httpService.signIn(user).subscribe({
            next: (data: User) => {    
                // console.log(data);
                this.dataService.setUser(data);
                
                this.httpService.getTodosById(data.id).subscribe({
                    next: (data: TodoSettings ) => {
                        // console.log(data);
                        this.dataService.setTodos(data.todos);
                    }
                });

                this.router.navigate(["todo/todos"]);
            },
            error: () => {
                this.loginForm.setValue({login: "", password: ""})
                this.loginForm.markAsUntouched;
                alert("try again");
            }
        });

        // fetch("https://dummyjson.com/auth/login", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
                
        //         username: this.loginForm.value.login,
        //         password: this.loginForm.value.password,
        //         // expiresInMins: 60, // optional
        //     })
        //     })
        //     .then(res => res.json())
        //     .then(console.log);


    }

    public ngOnInit(): void {
        this.loginForm.valueChanges.subscribe(console.log);    
    }

    

}

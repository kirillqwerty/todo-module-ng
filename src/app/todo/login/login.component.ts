import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { httpService } from "../http.service";
import { User } from "../user";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    providers: [httpService]
})
export class LoginComponent implements OnInit {

    public loginForm = this.fb.group({
        login: [<string | null> "", [Validators.required]],
        password: [<string | null> "", [Validators.required]]
    })

    constructor(private fb: FormBuilder,
                private httpService: httpService) { }

    public signIn(): void{

        const user: User = {
            username: this.loginForm.value.login as string,
            password: this.loginForm.value.password as string
        }

        this.httpService.signIn(user).subscribe({
            next: (data: any) => {console.log(data)},
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

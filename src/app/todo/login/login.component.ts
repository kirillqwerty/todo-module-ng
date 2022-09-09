import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

    public loginForm = this.fb.group({
        login: [<string | null> "", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        password: [<string | null> "", [Validators.required]]
    })

    constructor(private fb: FormBuilder) { }

    public signIn(): void{
        fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                
                username: this.loginForm.value.login,
                password: this.loginForm.value.password,
                // expiresInMins: 60, // optional
            })
            })
            .then(res => res.json())
            .then(console.log);
    }

    public ngOnInit(): void {
        this.loginForm.valueChanges.subscribe(console.log);
    }

    

}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {

    constructor(private router: Router,
                private httpService: HttpService) { }

    public ngOnInit(): void {
    }

    public goToTodos(): void {
        this.router.navigate(["todo/todos"])
    }

}

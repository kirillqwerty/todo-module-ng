import { Component, OnInit } from "@angular/core";
import { DataStreamService } from "../services/user-data-stream.service";
import { UserDataService } from "../services/user-data.service";
import { FullUserInfo } from "../types/fullUserInfo";

@Component({
    selector: "app-user-info",
    templateUrl: "./user-info.component.html",
    styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {

    public userInfo?: FullUserInfo;

    // public userInfo: FullUserInfo = {
    //     id: 2,
    //     firstName: "fasdfsaf",
    //     lastName: "sdafasdf",
    //     username: "adsf",
    //     age: 20,
    //     password: "dfafsad",
    //     birthDate: "adsfsadfsa",
    //     image: "https://robohash.org/facilisdignissimosdolore.png", 
    //     bloodGroup: "2A",
    //     height: 180,
    //     weight: 80
    // }

    constructor( private userData: UserDataService,
        private dataStream: DataStreamService) { }

    public ngOnInit(): void {
        // this.userInfo = this.userData.userInfo;
        console.log("this is from popup");
        console.log(this.userInfo);
    }

    public back(): void{
        this.dataStream.backToUsers();
    }

}

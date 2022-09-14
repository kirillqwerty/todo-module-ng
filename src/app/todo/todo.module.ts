import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms"
import { TodoRoutingModule } from "./todo-routing.module";
import { TodoComponent } from "./todo.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TaskListComponent } from "./task-list/task-list.component";
import { NewTodoComponent } from "./new-todo/new-todo.component";
import { UpdateTodoComponent } from "./update-todo/update-todo.component";
import { CanActivateGuard } from "./can-activate.guard";
import { HttpService } from "./services/http.service";
import { UserDataService } from "./services/user-data.service";
import { DataStreamService } from "./services/user-data-stream.service";
import { AuthService } from "./services/auth-service.service";
// import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { AuthInterceptor } from "./services/auth-interceptor.interceptor";
@NgModule({
  declarations: [
    TodoComponent,
    LoginComponent,
    TaskListComponent,
    NewTodoComponent,
    UpdateTodoComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // JwtModule
  ],

  providers: [
    HttpClientModule,
    CanActivateGuard,
    HttpService,
    UserDataService,
    DataStreamService,
    // { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    // JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthService
  ]
})
export class TodoModule { }

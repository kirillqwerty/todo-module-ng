import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms"
import { TodoRoutingModule } from "./todo-routing.module";
import { TodoComponent } from "./todo.component";
import { LoginComponent } from "./login/login.component";


@NgModule({
  declarations: [
    TodoComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule
  ]
})
export class TodoModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms"
import { TodoRoutingModule } from "./todo-routing.module";
import { TodoComponent } from "./todo.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { TaskListComponent } from "./task-list/task-list.component";
import { NewTodoComponent } from './new-todo/new-todo.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';


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
    HttpClientModule
  ],

  providers: [
    HttpClientModule
  ]
})
export class TodoModule { }

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NewTodoComponent } from "./new-todo/new-todo.component";
import { TaskListComponent } from "./task-list/task-list.component";
// import { TodoComponent } from "./todo.component";

const routes: Routes = [
    { path: "todos", component: TaskListComponent },
    { path: "login", component: LoginComponent },
    { path: "add-todo", component: NewTodoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoRoutingModule { }

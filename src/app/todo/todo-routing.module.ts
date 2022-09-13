import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanActivateGuard } from "./can-activate.guard";
import { LoginComponent } from "./login/login.component";
import { NewTodoComponent } from "./new-todo/new-todo.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { UpdateTodoComponent } from "./update-todo/update-todo.component";
// import { TodoComponent } from "./todo.component";

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "todos", component: TaskListComponent, canActivate: [CanActivateGuard] },
    { path: "add-todo", component: NewTodoComponent, canActivate: [CanActivateGuard] },
    { path: "update-todo", component: UpdateTodoComponent, canActivate: [CanActivateGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [CanActivateGuard]
})
export class TodoRoutingModule { }

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanActivateGuard } from "./can-activate.guard";
import { LoginComponent } from "./login/login.component";
import { ChangeTodoComponent } from "./change-todo/change-todo.component";
import { TaskListComponent } from "./task-list/task-list.component";
// import { TodoComponent } from "./todo.component";

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "todos", component: TaskListComponent, canActivate: [CanActivateGuard] },
    { path: "change-todo", component: ChangeTodoComponent, canActivate: [CanActivateGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [CanActivateGuard]
})
export class TodoRoutingModule { }

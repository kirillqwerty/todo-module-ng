import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";

const routes: Routes = [
  { 
    path: "todo", 
    loadChildren: () => import("./todo/todo.module").then(m => m.TodoModule) 
  },
  { path: "", component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

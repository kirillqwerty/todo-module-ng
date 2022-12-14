import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    // HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth-service.service";
import { TodoSettings } from "../types/todoSettings";
import { Todo } from "../types/todoType";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    public intercept(request: HttpRequest<TodoSettings|Todo>, next: HttpHandler): Observable<HttpEvent<TodoSettings|Todo>> {
        return next.handle(this.addAuthToken(request));
    }
  
    private addAuthToken(request: HttpRequest<TodoSettings|Todo>): HttpRequest<TodoSettings|Todo> {
        const token = this.authService.token;
    
        if(request.withCredentials){   
            return request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        return request;
        
    }
}

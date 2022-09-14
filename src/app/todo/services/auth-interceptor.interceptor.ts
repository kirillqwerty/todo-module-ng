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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthToken(request));
    }
  
    private addAuthToken(request: HttpRequest<any>): HttpRequest<any> {
        const token = this.authService.Token;
    
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

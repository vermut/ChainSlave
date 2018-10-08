import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from "@angular/router";
import {AuthenticationService} from "../_services";

@Injectable()
export class AuthRedirect implements HttpInterceptor {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      event => {
      },
      err => {
        if (err instanceof HttpErrorResponse && err.status == 401) {
          // handle 401 errors
          console.log("logging out");
          this.authenticationService.logout();
          this.router.navigate(['login']);
        }
      });
  }
}

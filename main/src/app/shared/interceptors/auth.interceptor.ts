import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    constructor(private _authService: AuthService) {
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request object
        let newReq = req.clone();
        if (this._authService.accessToken) {
          console.log(this._authService.accessToken)
            newReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken)
            });
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error: any) => {
                console.log(error instanceof HttpErrorResponse);
                // Catch "401 Unauthorized" responses
                // if (error?.status === '401') {
                //
                //     this._authService.signOut();
                // }

                // if (error instanceof HttpErrorResponse) {
                //     // Sign out
                //     this._authService.signOut();
                //
                //     // Reload the app
                //     // location.reload();
                // }

                return throwError(error);
            })
        );
    }
}

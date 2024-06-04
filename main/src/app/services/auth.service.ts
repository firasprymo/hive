import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserService} from './user.service';
import {environment} from '../../environments/environment';
import {Users} from '../shared/model/user.types';
import {ApiService} from './api.service';

const helper = new JwtHelperService();


@Injectable()
export class AuthService {
    decodedToken: any;
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem(environment.accessToken, token);
    }

    get accessToken(): string {
        return localStorage.getItem(environment.accessToken) ?? '';
    }

    set setUser(user: string) {
        localStorage.setItem(environment.users, user);

        // this._userService.get();
    }

    get getUser(): Users {
        // @ts-ignore
      return JSON.parse(localStorage.getItem(environment.users)) ?? null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        // const headers = new HttpHeaders({
        //     'Content-Type': 'application/json',
        // });
        return this._httpClient.post(`${ApiService.apiVersion}auth/login`, credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.token;
                this.decodedToken = helper.decodeToken(this.accessToken);
                localStorage.setItem('username', this.decodedToken.username);
                const user = this._userService.get();
                user.subscribe((res) => {
                    this.setUser = JSON.stringify(res);
                });
                // Set the authenticated flag to true
                this._authenticated = true;
                // Store the user on the user service

                // Return a new observable with the response
                return of(this.decodedToken);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this._httpClient.get(`${ApiService.apiVersion}/refresh-access-token`).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.access_token;
                this.decodedToken = helper.decodeToken(this.accessToken);
                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = this.decodedToken.sub;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem(environment.accessToken);
        localStorage.removeItem(environment.users);
        localStorage.removeItem(environment.username);

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: any): Observable<any> {
      console.log(user)
        return this._httpClient.post(`${ApiService.apiUser}/sign-up`, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        if (this._authenticated) {
            return of(true);
        }

        if (!this.accessToken) {
            return of(false);
        }

        return of(true);
    }
}

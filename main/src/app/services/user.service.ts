import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Users} from '../shared/model/user.types';
import {ApiService} from './api.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // @ts-ignore
  private _user: BehaviorSubject<Users> = new BehaviorSubject<Users>(null);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: Users) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<Users> {
    return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current logged in user data
   */
  get(): Observable<Users> {
    const username = localStorage.getItem('username');
    if (!username) {
      // @ts-ignore
      return of([]);
    }
    return this._httpClient.get<Users>(`${ApiService.apiUser}/Me`).pipe(
      tap((response: any) => {
        console.log(response)
        // Store the access token in the local storage
        this._user.next(response);
        // Return a new observable with the response
        return of(response);

      }));
  }

  /**
   * Update the user
   *
   * @param user
   */
  update(user: Users): Observable<any> {
    return this._httpClient.patch<Users>('api/common/user', {user}).pipe(
      map((response) => {
        this._user.next(response);
      })
    );
  }
}

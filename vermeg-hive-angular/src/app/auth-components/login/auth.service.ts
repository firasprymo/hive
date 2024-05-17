import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/authentication';

  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set ('Content-Type', 'application/json');
    return this.http.post(this.apiUrl, { username, password }, { headers, withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  
    }
  
}

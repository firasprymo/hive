import {Injectable} from '@angular/core';
import {HttpClient, } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public static ACCEPTED = 'ACCEPTED';
    public static PENDING = 'PENDING';
    public static apiVersion = environment.apiUrl;
    public static apiPicture = environment.apiImg;
    public static apiUser =ApiService.apiVersion + environment.users;
    public static apiQuestions = ApiService.apiVersion + environment.questions;

    token: any;

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem(environment.accessToken);

    }

    /**
     * @param url
     */
    get(url: string): Observable<any> {

        return this.http.get<any>(environment.apiUrl + url)
            .pipe(map((res: any) => res),
                catchError(err => throwError(err)
                ));

    }


    /**
     *
     * @param url string
     * @param entities string
     * @param id number
     */
    put(url: string, entities: string, id: number): Observable<any> {

        return this.http.put(environment.apiUrl + url + id, entities)
            .pipe(
                map((res: any) => res,
                    (err: any) => console.log(err)));
    }


    patch(url: string, entities: any): Observable<any> {
        return this.http.patch(url, entities)
            .pipe(map((res: any) => res,
                catchError(err => throwError(err)
                )));
    }

    /**
     *
     * @param url string
     * @param id number
     */
    delete(url: string, id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}${url}/${id}`)
            .pipe(map((res: any) => res,
                catchError(err => throwError(err)
                )));
    }

    /**
     * @param url string
     * @param entity object
     */

    post(url: string, entity: any): Observable<any> {
        console.log(environment.apiUrl + url, entity);

        return this.http.post(`${environment.apiUrl}${url}`, entity)
            .pipe(map((res: any) => res,
                catchError((err: any) => {
                        console.log(err);
                        return throwError(err);
                    }
                )));
    }

}

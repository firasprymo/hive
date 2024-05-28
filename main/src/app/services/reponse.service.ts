import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {


  constructor(private http: HttpClient) {
  }

  getAllReponses(): Observable<any[]> {
    return this.http.get<any[]>(`${ApiService.apiReponses}`);
  }

  getReponseById(id: number): Observable<any> {
    const url = `${ApiService.apiReponses}/${id}`;
    return this.http.get<any>(url);
  }

  createReponse(reponse: any): Observable<any> {
    return this.http.post<any>(`${ApiService.apiReponses}/add-reponse`, reponse);
  }

  removeReponse(id?: number): Observable<any> {
    return this.http.delete(`${ApiService.apiReponses}/remove-reponse/${id}`);
  }

  updateReponse(reponse: any): Observable<any> {
    return this.http.patch(`${ApiService.apiReponses}/`, reponse);

  }

}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  constructor(private http: HttpClient) {
  }

  getAllQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${ApiService.apiQuestions}`);
  }

  getQuestionById(id: number): Observable<any> {
    const url = `${ApiService.apiQuestions}/${id}`;
    return this.http.get<any>(url);
  }

  createQuestion(question: any): Observable<any> {
    return this.http.post<any>(`${ApiService.apiQuestions}/add-question`, question);
  }

  addReponseToQuestion(question: any, id?: number): Observable<any> {
    return this.http.patch(`${ApiService.apiQuestions}/add-reponse-question/${id}`, question);
  }

  updateQuestion(question: any): Observable<any> {
    const url = `${ApiService.apiQuestions}/${question.id}`;
    return this.http.put<any>(url, question);
  }

  deleteQuestion(id: number): Observable<any> {
    const url = `${ApiService.apiQuestions}/${id}`;
    return this.http.delete<any>(url);
  }
}

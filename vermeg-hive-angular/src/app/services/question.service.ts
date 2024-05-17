import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getQuestionById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createQuestion(question: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, question);
  }

  updateQuestion(question: any): Observable<any> {
    const url = `${this.apiUrl}/${question.id}`;
    return this.http.put<any>(url, question);
  }

  deleteQuestion(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {Question} from '../shared/model/question.types';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  constructor(private http: HttpClient) {
  }

  getAllQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${ApiService.apiQuestions}`);
  }

  getQuestionById(id: number | undefined): Observable<any> {
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
    return this.http.patch(`${ApiService.apiQuestions}/`, question);

  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${ApiService.apiQuestions}/${id}`);
  }
  voteUpQuestion(question: Question): Observable<any> {
    return this.http.patch(`${ApiService.apiQuestions}/vote_up_question/`,question);
  }
  voteDownQuestion(question: Question): Observable<any> {
    return this.http.patch(`${ApiService.apiQuestions}/vote_down_question/`,question);
  }
}

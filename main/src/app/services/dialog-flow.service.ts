import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders,} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {TextMessage} from '../shared/model/text-message.types';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {ResponseMessage} from '../shared/model/response-message.types';

@Injectable({
  providedIn: 'root'
})
export class DialogFlowService {
  constructor(private http: HttpClient) {
  }

  sendMessage(textMessage: TextMessage): Observable<ResponseMessage> {
    const reqBody = {
      "projectId": environment.dialogflow.projectId,
      "requestText": textMessage.text
    };
    return this.http.post<ResponseMessage>(`${ApiService.apiDialogFlow}/query`, reqBody);

  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = '/api/message';

  constructor(private http: HttpClient) { }

  sendMessage(message: Message): Observable<Message> {
    const requestBody = {
      sender: message.sender,
      recipient: message.recipient,
      content: message.content
    };
    
    return this.http.post<Message>(this.apiUrl + "/send", requestBody);
  }

  getReceivedByUserId(userId: number): Observable<Message[]> {
    const url = `${this.apiUrl}/received/${userId}`;
    return this.http.get<Message[]>(url);
  }

  getSentByUserId(userId: number): Observable<Message[]> {
    const url = `${this.apiUrl}/sent/${userId}`;
    return this.http.get<Message[]>(url);

  }
}

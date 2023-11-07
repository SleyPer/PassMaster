import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

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

  getSentByUserIdToRecipientId(userId: number, recipientId: number): Observable<Message[]> {
    const url = `${this.apiUrl}/sentBy/${userId}/to/${recipientId}`;
    return this.http.get<Message[]>(url);
  }

  getReceivedByUserIdFromSenderId(userId: number, senderId: number): Observable<Message[]> {
    const url = `${this.apiUrl}/receivedBy/${userId}/from/${senderId}`;
    return this.http.get<Message[]>(url);
  }

  getAllByUserIdWithFriendId(userId: number, friendId: number): Observable<Message[]> {
    const url = `${this.apiUrl}/all/${userId}/with/${friendId}`;
    return this.http.get<Message[]>(url);
  }
}

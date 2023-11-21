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

  getMessagesByRoomId(roomId: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl + "/" + roomId);
  }
}

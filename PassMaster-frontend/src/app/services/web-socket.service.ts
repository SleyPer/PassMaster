import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private messageSubject: Subject<Message> = new Subject<Message>();
  private connectedUsersSubject: Subject<number[]> = new Subject<number[]>();

  connectedUserId: number = 0;
  private roomId: any;

  constructor(private authService: AuthService) {
    const token = this.authService.getToken();
    this.connectedUserId = this.authService.getDecodedToken(token).jti;
  }

  stompClient: any;

  openChatWithFriend(friendId: number) {
    const roomId = this.generateUniqueRoomId(this.connectedUserId, friendId);
    this.initializeWebSocketConnection(roomId);
  }

  initializeWebSocketConnection(roomId: string) {
    const serverUrl = 'http://localhost:8080/socket';
    const ws = new SockJS(serverUrl);
    const token = this.authService.getToken();
    const connectedUserId = this.authService.getDecodedToken(token).jti;
    const headers = { 'userId': connectedUserId, 'roomId': roomId };
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect(headers, () => {
      this.roomId = roomId;
      that.stompClient.subscribe('/message/' + this.roomId, (message: any) => {
        if (message) {
          const messageObject: Message = that.parseMessage(message.body);
          that.messageSubject.next(messageObject);
        }
      });
      that.stompClient.subscribe('/connected-users/' + roomId, (usersList: number[]) => {
        if (usersList) {
          this.connectedUsersSubject.next(usersList);
        }
      });
    });
  }

  generateUniqueRoomId(userId1: number, userId2: number): string {
    const smallerUserId = Math.min(userId1, userId2);
    const largerUserId = Math.max(userId1, userId2);
    const roomId = `${smallerUserId}-${largerUserId}`;
    return roomId;
  }

  sendMessage(message: Message) {
    this.stompClient.send('/app/send/message/' + this.roomId, {}, JSON.stringify(message));
  }

  disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect(() => {
        this.roomId = null;
      });
    }
  }

  getMessages(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  getConnectedUsers(): Observable<number[]> {
    return this.connectedUsersSubject.asObservable();
  }

  private parseMessage(message: string): Message {
    return JSON.parse(message);
  }
}

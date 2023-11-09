import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { UserService } from './user.service';
declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  constructor(private userService: UserService) {
    this.initializeWebSocketConnection();
  }
  stompClient: any;
  msg: Message[] = [];
  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame: any) {
      that.stompClient.subscribe('/message', (message: any) => {
        if (message) {
          var messageObject = new Message();
          console.log(message)
          const senderMatch = /"sender":({.*?}),/;
          const senderIdMatch = /"senderId":(\d+)/;
          const contentMatch = /"content":"(.*?)"/;
          const timestampMatch = /"timestamp":"(.*?)"/;

          const senderMatchResult = senderMatch.exec(message);
          const senderIdMatchResult = senderIdMatch.exec(message);
          const contentMatchResult = contentMatch.exec(message);
          const timestampMatchResult = timestampMatch.exec(message);

          if (senderMatchResult && senderIdMatchResult && contentMatchResult && timestampMatchResult) {
            const sender = JSON.parse(senderMatchResult[1]);
            const content = contentMatchResult[1];
            const timestamp = new Date(timestampMatchResult[1]);

            messageObject.sender = sender;
            messageObject.senderId = parseInt(senderIdMatchResult[1], 10);
            messageObject.content = content;
            messageObject.timestamp = timestamp;
          }

          that.msg.push(messageObject);
        }
      });
    });
  }

  sendMessage(message: Message) {
    this.stompClient.send('/app/send/message', {}, JSON.stringify(message));
  }

  getMessages() {
    return this.msg;
  }
}

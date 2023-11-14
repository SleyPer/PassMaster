import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Room } from '../models/room.model';
import { RoomService } from './room.service';


@Injectable({
  providedIn: 'root'
})
export class RoomListService {

  rooms: Room[] = [];
  userId: number;

  constructor(private roomService: RoomService, private authService: AuthService) {
    const token = this.authService.getToken();
    this.userId = this.authService.getDecodedToken(token).jti;
    this.roomService.getRoomsByUserId(this.userId).subscribe((data: Room[]) => {
      this.rooms = data;
    });
  }

  addRoom(room: Room) {
    if (room) {
      this.rooms.push(room);
    }
    this.roomService.addRoom(room);
    this.roomService.getRoomsByUserId(this.userId).subscribe((data: Room[]) => {
      this.rooms = data;
    });
    return room;
  }

  deleteRoom(room: Room) {
    if (room) {
      for (const r of this.rooms) {
        if (r.id === room.id) {
          this.rooms.splice(this.rooms.indexOf(r), 1);
        }
      }
    }
    return this.roomService.deleteRoom(room);
  }
}

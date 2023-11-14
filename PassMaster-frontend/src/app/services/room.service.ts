import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = '/api/room';

  constructor(private http: HttpClient) { }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  getRoomById(roomId: string): Observable<Room> {
    const url = `${this.apiUrl}/${roomId}`;
    return this.http.get<Room>(url);
  }

  updateRoom(updatedRoom: Room): Observable<Room> {
    const url = `${this.apiUrl}/${updatedRoom.id}`;
    return this.http.put<Room>(url, updatedRoom);
  }

  getRoomsByName(name: string): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl + "/search", { params: { name } });
  }

  getRoomsByUserId(userId: number): Observable<Room[]> {
    const url = `${this.apiUrl}/${userId}/rooms`;
    return this.http.get<Room[]>(url);
  }

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room);
  }

  deleteRoom(room: Room): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${room.id}`);
  }
}

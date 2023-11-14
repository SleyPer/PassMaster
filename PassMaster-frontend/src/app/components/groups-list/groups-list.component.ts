import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomListService } from 'src/app/services/room-list.service';


@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent {
  search: string = "";

  constructor(
    private router: Router,
    private roomListService: RoomListService
  ) {
    this.rooms;
  }

  addRoom() {
    this.router.navigate(["/createRoom"]);
  }

  openMessages(room: Room) {
    this.router.navigate(['/group-message/', room.id]);
  }

  searchGroups() {
    if (this.search.trim() === '') {
      this.rooms;
    } else {
      const searchTerm = this.search.toLowerCase();
      this.rooms = this.rooms.filter(room => room.name ?
        room.name.toLowerCase().includes(searchTerm) : "");
    }
  }

  get rooms() {
    return this.roomListService.rooms;
  }

  set rooms(rooms: Room[]) {
    this.roomListService.rooms = rooms;
  }
}

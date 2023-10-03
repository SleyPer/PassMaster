import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chest } from './chest.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChestService {

  private apiUrl = 'http://localhost:8080/api/chests';

  constructor(private http: HttpClient) { }

  getAllChests(): Observable<Chest[]>{
    return this.http.get<Chest[]>(this.apiUrl);
  }

  getChestById(chestId: number): Observable<Chest> {
    const url = `${this.apiUrl}/${chestId}`;
    return this.http.get<Chest>(url);
  }

  createChest(newChest: Chest): Observable<Chest> {
    return this.http.post<Chest>(this.apiUrl, newChest);
  }

  updateChest(updatedChest: Chest): Observable<Chest> {
    const url = `${this.apiUrl}/${updatedChest.id}`;
    return this.http.put<Chest>(url, updatedChest);
  }  

  deleteChest(deletedChest: Chest): Observable<void> {
    const url = `${this.apiUrl}/${deletedChest.id}`;
    return this.http.delete<void>(url);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url: String = 'http://localhost:3000/enquiry';

  constructor(private httpClient: HttpClient) {}

  postRegistration(registerObj: User) {
    return this.httpClient.post<User>(`${this.url}`, registerObj);
  }

  getRegisteredUser() {
    return this.httpClient.get<User[]>(`${this.url}`);
  }

  updateRegistredUser(registerObj: User, id: number) {
    return this.httpClient.put<User>(`${this.url}/${id}`, registerObj);
  }

  deleteRegisteredUser(id: number) {
    return this.httpClient.delete<User>(`${this.url}/${id}`);
  }

  getRegisteredUserId(id: number) {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConfigService} from "./api-config-services";
import {Observable} from "rxjs";
import {User} from "../../shared/models/user.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
      private http: HttpClient,
      private api: ApiConfigService
  ) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.api.users.all);
  }

  getByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.api.users.byEmail(email));
  }
}

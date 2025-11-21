import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConfigService} from "./api-config-services";
import {AuthResponse, LoginRequest, RegisterRequest} from "../../shared/models/auth/auth.model";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
      private http: HttpClient,
      private api: ApiConfigService
  ) {}

  login(body: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.api.auth.login, body);
  }

  register(body: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.api.auth.register, body);
  }
}

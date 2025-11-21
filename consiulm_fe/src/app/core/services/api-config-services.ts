import { Injectable } from '@angular/core';
import {environment} from "../../../enviroment/enviroment.dev";


@Injectable({ providedIn: 'root' })
export class ApiConfigService {

  private base = environment.apiBase;
  private ep = environment.endpoints;

  get auth() {
    return {
      login: this.base + this.ep.auth.login,
      register: this.base + this.ep.auth.register
    };
  }

  get users() {
    return {
      all: this.base + this.ep.users.all,
      byEmail: (email: string) => this.base + this.ep.users.byEmail(email)
    };
  }
}

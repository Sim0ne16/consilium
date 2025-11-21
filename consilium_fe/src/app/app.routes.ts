import {Routes} from '@angular/router';
import {Auth} from "./features/auth/auth";
import {Home} from "./features/home/home";
import {Faq} from "./features/faq/faq";
import {Dashboard} from "./features/dashboard/dashboard";
import {authGuard} from "./core/guards/auth.guard";
import {guestGuard} from "./core/guards/guest.guard";

export const routes: Routes = [
    {path: 'home', component: Home, pathMatch: 'full', canActivate: [guestGuard]},
    {path: 'faq', component: Faq, pathMatch: 'full', canActivate: [guestGuard]},
    {path: 'login', component: Auth, pathMatch: 'full', canActivate: [guestGuard]},
    {path: 'dashboard', component: Dashboard, pathMatch: 'full', canActivate: [authGuard]},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];

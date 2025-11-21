import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {exhaustMap, of, switchMap, tap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "../core/services/auth-services";
import {login, loginFailure, loginSuccess, register, registerFailure, registerSuccess} from "./app.action";


@Injectable()
export class AppEffect {

    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);
    private messageService = inject(MessageService);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            exhaustMap(({email, password}) =>
                this.authService.login({email, password}).pipe(
                    map(res => loginSuccess({token: res.token})),
                    catchError(error => of(loginFailure({error})))
                )
            )
        )
    );


    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginSuccess),
                tap(({token}) => {
                    localStorage.setItem('auth_token', token);

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successo',
                        detail: 'Login effettuato con successo',
                        life: 3000
                    });

                    this.router.navigate(['/dashboard']);
                })
            ),
        {dispatch: false}
    );

    loginFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginFailure),
                tap(() => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Errore',
                        detail: 'Credenziali non valide',
                        life: 3000
                    });
                })
            ),
        {dispatch: false}
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(register),
            exhaustMap(({name, surname, role, jobs, email, password}) =>
                this.authService.register({name, surname, role, jobs, email, password}).pipe(
                    map(res => registerSuccess({token: res.token})),
                    catchError(error => of(registerFailure({error})))
                )
            )
        )
    );

    registerSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(registerSuccess),
                tap(({token}) => {
                    localStorage.setItem('auth_token', token);

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successo',
                        detail: 'Registrazione completata',
                        life: 3000
                    });

                    this.router.navigate(['/dashboard']);
                })
            ),
        {dispatch: false}
    );


    registerFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(registerFailure),
                tap(() => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Errore',
                        detail: 'Registrazione non riuscita',
                        life: 3000
                    });
                })
            ),
        {dispatch: false}
    );


}

import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Store} from "@ngrx/store";
import {Toast} from "primeng/toast";
import {Observable} from "rxjs";
import {AppState} from "./store/app.state";


@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        AsyncPipe,
        Toast

    ],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    loading$!: Observable<boolean>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.loading$ = this.store.select(s => s.loading);
    }
}

// core/interceptors/loading.interceptor.ts
import { Injectable, inject } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {startLoading, stopLoading} from "../../store/app.action";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private store = inject(Store);

    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        this.store.dispatch(startLoading());

        return next.handle(req).pipe(
            finalize(() => {
                this.store.dispatch(stopLoading());
            })
        );
    }
}

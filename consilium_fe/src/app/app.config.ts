import {
    ApplicationConfig,
    inject,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {providePrimeNG} from "primeng/config";
import DeepSeaPreset from "./mypreset";
import {HttpHandler, provideHttpClient, withInterceptors} from "@angular/common/http";
import {LoadingInterceptor} from "./core/interceptors/loading-interceptor";
import {AppReducer} from "./store/app.reducer";
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {MessageService} from "primeng/api";
import {AppEffect} from "./store/app.effect";

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes),
        provideAnimationsAsync(),

        providePrimeNG({
            theme: {
                preset: DeepSeaPreset,
                options: {
                    darkModeSelector: '.dark'
                }
            }
        }),

        provideStore({
            AppReducer
        }),

        provideEffects([AppEffect]),
        provideStoreDevtools({maxAge: 25}),
        MessageService,
        provideHttpClient(withInterceptors([req => inject(LoadingInterceptor).intercept(req, inject(HttpHandler as any))])),
    ],
};

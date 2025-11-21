import {createSelector} from "@ngrx/store";
import {AppState} from "./app.state";

export const selectAuthState = (state: AppState): AppState => state;


export const selectAuthLoading = createSelector(
    selectAuthState,
    state => state.loading
);

export const selectAuthError = createSelector(
    selectAuthState,
    state => state.error
);



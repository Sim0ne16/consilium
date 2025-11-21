import {AppState} from "./app.state";
import {createReducer, on} from "@ngrx/store";
import {clearError, setError, startLoading, stopLoading} from "./app.action";

export const initialState: AppState = {
    loading: false,
    error: null,
};

export const AppReducer = createReducer(
        initialState,

        on(startLoading, state => ({
            ...state,
            loading: true
        })),

        on(stopLoading, state => ({
            ...state,
            loading: false
        })),


        on(setError, (state, {error}) => ({
            ...state,
            error
        })),

        on(clearError, state => ({
            ...state,
            error: null
        })),
    )
;

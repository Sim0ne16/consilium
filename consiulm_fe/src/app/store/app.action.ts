import {createAction, props} from "@ngrx/store";

export const startLoading = createAction('[UI] Start Loading');
export const stopLoading = createAction('[UI] Stop Loading');

export const setError = createAction(
    '[App] Set Error',
    props<{ error: string }>()
);

export const clearError = createAction(
    '[App] Clear Error'
);

export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ token: string }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);

export const register = createAction(
    '[Auth] Register',
    props<{
        name: string,
        surname: string,
        role: string,
        jobs: string[],
        email: string;
        password: string;
    }>()
);

export const registerSuccess = createAction(
    '[Auth] Register Success',
    props<{ token: string }>()
);

export const registerFailure = createAction(
    '[Auth] Register Failure',
    props<{ error: any }>()
);


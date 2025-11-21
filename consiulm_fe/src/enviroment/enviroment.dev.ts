export const environment = {
    production: false,

    apiBase: 'http://localhost:8080/api',

    endpoints: {
        auth: {
            login: '/auth/login',
            register: '/auth/register'
        },
        users: {
            byEmail: (email: string) => `/users/${email}`,
            all: '/users'
        }
    }
};

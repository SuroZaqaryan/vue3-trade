export interface User {
    user: string;
    password: string;
    name: string;
    role: string;
}

export interface AuthState {
    user: User | null
    username: null;
    isAuthenticated: boolean
    isAdmin: boolean
}

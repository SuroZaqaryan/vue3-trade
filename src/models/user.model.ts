export interface UserInfoOrder {
    id: number | string;
    name: string | null;
    address: string;
    comment: string;
    status: string;
    date: string;
}
export interface User {
    id: number | string;
    user: string;
    password: string;
    name: string;
    role: string;
}

export interface AuthState {
    user: User;
    isAuthenticated: boolean;
}

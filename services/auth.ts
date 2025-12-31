import api from "./api";

export type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

export type AuthResponse = {
    user: User;
    access_token: string;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
};

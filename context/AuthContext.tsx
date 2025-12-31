import React, { createContext, useContext, useState } from "react";
import { User, login as loginApi, register as registerApi } from "../services/auth";
import { setAuthToken } from "../services/api";

type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// This hook can be used to access the user info.
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // Initial loading check

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const data = await loginApi(email, password);
            setUser(data.user);
            setToken(data.access_token);
            setAuthToken(data.access_token);
            // Ideally set token in axios headers here or in an interceptor
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (name: string, email: string, password: string) => {
        setLoading(true);
        try {
            const data = await registerApi(name, email, password);
            setUser(data.user);
            setToken(data.access_token);
            setAuthToken(data.access_token);
        } catch (error) {
            console.error("Register failed", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signOut = () => {
        setUser(null);
        setToken(null);
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

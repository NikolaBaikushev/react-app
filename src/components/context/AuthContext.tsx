import { createContext, useContext, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { getLocalStorageItem, LocalStorageKeys, setLocalStorageItem } from "../../services/localStorage.service";
import type { User } from "../../types/auth/login";

type AuthContextType = {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = getLocalStorageItem(LocalStorageKeys.USER);
        return storedUser ? JSON.parse(storedUser) as User : null;
    })

    useEffect(() => {
        if (user) {
            setLocalStorageItem(LocalStorageKeys.USER, JSON.stringify(user));
        } else {
            localStorage.removeItem(LocalStorageKeys.USER);
        }
    }, [user]);

    const context = useMemo(() => ({
        user,
        setUser
    }), [user])

    return (
               <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};


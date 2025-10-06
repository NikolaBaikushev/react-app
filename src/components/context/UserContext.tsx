import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { deleteLocalStorageItem, getLocalStorageItem, LocalStorageKeys, setLocalStorageItem } from "../../services/localStorage.service";
import type { User } from "../../types/auth/login";
import { useNavigate } from "react-router-dom";



type AuthContextType = [User | null, Dispatch<SetStateAction<User | null>>];


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

    return (
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};


export const useLogout = () => {
  const [, setUser] = useAuth();
  const navigate = useNavigate();

  return () => {
    deleteLocalStorageItem(LocalStorageKeys.USER);
    setUser(null);
    navigate("/login");
  };
};
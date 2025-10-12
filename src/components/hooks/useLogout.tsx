import { useNavigate } from "react-router-dom";
import { deleteLocalStorageItem, LocalStorageKeys } from "../../services/localStorage.service";
import { useAuth } from "../context/AuthContext";

export const useLogout = () => {
  const {setUser} = useAuth();
  const navigate = useNavigate();

  return () => {
    deleteLocalStorageItem(LocalStorageKeys.USER);
    setUser(null);
    navigate("/login");
  };
};


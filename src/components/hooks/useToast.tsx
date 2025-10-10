import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setToastState, clearToastState, ToastType } from "../../redux/slices/toast/toastSlice";

export default function useToast() {
    const toast = useAppSelector(state => state.toast);
    const dispatch = useAppDispatch();

    const setToast = (message: string, type: ToastType) => {
        dispatch(setToastState({ message, type }))
    }

    const clearToast = () => dispatch(clearToastState());
    return { toast, setToast, clearToast }
}
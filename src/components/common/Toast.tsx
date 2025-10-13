import { useEffect } from "react"
import withPortal from "../hoc/withPortal.tsx"
import useToast from "../hooks/useToast"
import { ToastType } from "../../redux/slices/toast/toastSlice.ts";

const ToastComponent = () => {
    const { toast, clearToast } = useToast();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            clearToast()
        }, toast.duration);
        return () => {
            clearTimeout(timeoutId)
        }
    }, [toast])

    if (!toast.message) {
        return null
    }
    const alertClass = toast.type === ToastType.SUCCESS ?
        'alert-success' : toast.type === ToastType.ERROR ?
        'alert-error' : 'alert-info'
    return <>
        <div className="toast toast-end toast-top sm:toast-end sm:toast-bottom w-xs sm:w-lg sm:animate-bounce sm:duration-500 z-50 ">
            <div className={`alert ${alertClass} min-w-fit`}>
                <span className="text-base">{toast.message}</span>
            </div>
        </div>
    </>
}

const Toast = withPortal(ToastComponent, 'toasts');
export default Toast;


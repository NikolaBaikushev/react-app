import { useEffect, type JSX } from "react"
import withPortal from "../hoc/withPortal.tsx"
import useToast from "../hooks/useToast"

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
    
    return <>
        <div className="toast toast-end toast-top sm:toast-end sm:toast-bottom w-xs sm:w-lg sm:animate-bounce sm:duration-500 z-50 ">
            <div className="alert alert-success min-w-fit">
                <span className="text-base">{toast.message}</span>
            </div>
        </div>
    </>
}

const Toast = withPortal(ToastComponent, 'toasts');
export default Toast;


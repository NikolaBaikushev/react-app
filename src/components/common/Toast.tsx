import type { JSX } from "react"
import withPortal from "./PortalWrapper"

type ToastProps = {
    message: string
} & JSX.IntrinsicAttributes

const ToastComponent = ({message}: ToastProps) => {
  return <>
   <div className="toast toast-end toast-top sm:toast-end sm:toast-bottom w-xs sm:w-lg sm:animate-bounce sm:duration-500 z-50 ">
          <div className="alert alert-success min-w-fit">
            <span className="text-base">{message}</span>
          </div>
        </div>
  </>
}

const Toast = withPortal(ToastComponent, 'toasts');
export default Toast;


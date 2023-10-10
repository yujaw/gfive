import { createContext } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import "react-toastify/dist/ReactToastify.css";

export const ToastContext = createContext({})

export const ToastProvider = ({ children }) => {

    const successNotification = (text) => {
        toast.success(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const errorNotification = (text) => {
        toast.error(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <ToastContext.Provider value={{
            successNotification,
            errorNotification
        }}>
            <ToastContainer />
            {children}
        </ToastContext.Provider>
    )
}
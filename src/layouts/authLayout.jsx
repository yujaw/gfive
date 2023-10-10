import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from "../hooks/useAuth";

const AuthLayout = () => {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        auth?.email
            ? <Outlet />
            : <Navigate to='/signin' state={{ from: location }} replace />
    )
}

export default AuthLayout
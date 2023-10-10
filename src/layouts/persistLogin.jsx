import { Outlet } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Loader from "../components/Loader";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true

        const verifyRefreshToken = async () => {
            try {
                await refresh()
            }
            catch (err) {
                // console.log(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
    }, [auth?.email, auth?.accessToken, refresh, isLoading])

    return (
        <Fragment>
            {
                isLoading
                    ? <Loader />
                    : <Outlet />
            }
        </Fragment>
    )
}

export default PersistLogin
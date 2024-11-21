import axios from '../api/axios'
import useAuth from './useAuth'

const LOGOUT_URL = '/auth/logout'

const useLogout = () => {
    const { setAuth } = useAuth()

    const logout = async () => {
        try {
            await axios
                .get(LOGOUT_URL, {
                    withCredentials: true
                })
                .then(() => {
                    setAuth({})
                })
        } catch (err) {
            console.log(err)
        }
    }

    return logout
}

export default useLogout
import axios from '../api/axios'
import useAuth from './useAuth'

const REFRESH_URL = '/auth/refresh'

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const response = await axios.get(REFRESH_URL, {
            withCredentials: true,
        })
        setAuth((prev) => {
            return { ...prev, accessToken: response.data.accessToken, email: response.data.email, profileImage: response.data.profileImage }
        })
        return response.data.accessToken
    }

    return refresh
}

export default useRefreshToken 
import axios from '../api/axios'
import useAuth from './useAuth'

const REFRESH_URL = '/refresh'

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const response = await axios.get(REFRESH_URL, {
            withCredentials: true,
        })
        setAuth((prev) => {
            // console.log(`Auth: ${JSON.stringify(auth)}`)
            // console.log(`Prev: ${JSON.stringify(prev)}`)
            // console.log(`AccessTOken: ${response.data.accessToken}`)
            // console.log({ ...prev, accessToken: response.data.accessToken, email: response.data.email })
            return { ...prev, accessToken: response.data.accessToken, email: response.data.email, profileImage: response.data.profileImage }
        })
        return response.data.accessToken
    }

    return refresh
}

export default useRefreshToken 
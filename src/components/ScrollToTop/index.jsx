import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const location = useLocation()
    useEffect(() => {
        if (location.pathname.split('/')[1] !== 'account') {
            window.scrollTo(0, 0)
        }
    }, [location])
    return null
}

export default ScrollToTop
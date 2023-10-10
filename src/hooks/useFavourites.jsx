import { useContext } from 'react'
import FavouritesContext from '../context/FavouritesProvider'

export const useFavourites = () => {
    return useContext(FavouritesContext)
}

export default useFavourites

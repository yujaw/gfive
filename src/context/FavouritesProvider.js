import { createContext, useState } from "react"

const FavouritesContext = createContext({
    favItems: [],
})

export function FavouritesProvider({ children }) {
    const [favItems, setFavItems] = useState([])

    const toggleFav = (id) => {
        setFavItems(currItems => {
            if (currItems.find((item) => item === id) == null) {
                return [...currItems, id]
            } else {
                return currItems.filter((item) => item !== id)
            }
        })
    }

    return (
        <FavouritesContext.Provider value={{
            toggleFav,
            favItems
        }}>
            {children}
        </FavouritesContext.Provider>
    )
}

export default FavouritesContext
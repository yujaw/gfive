import { createContext, useState } from "react";

const SearchContext = createContext({})

export const SearchProvider = ({ children }) => {
    const [values, setValues] = useState({
        keyword: '',
        result: []
    })
    const [topSearch, setTopSearch] = useState(false)
    const toggleSearch = () => {
        setTopSearch(!topSearch)
    }

    return (
        <SearchContext.Provider value={{
            values,
            setValues,
            topSearch,
            toggleSearch,
            setTopSearch
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext
import { useContext } from "react"
import SearchContext from "../context/SearchProvider"

export const useSearch = () => {
    return useContext(SearchContext)
}

export default useSearch
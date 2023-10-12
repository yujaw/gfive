import { createContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const FilterContext = createContext({
    chip: []
})

export const FilterProvider = ({ children }) => {

    const [chip, setChip] = useLocalStorage('Chips', [])

    const [sort, setSort] = useLocalStorage('Sort', {
        name: 'Product Name',
        order: '1',
    })

    const [page, setPage] = useState('1')

    const toggleChip = (items) => {
        setChip((currItems) => {
            if (currItems.find((item) => item === items) == null) {
                return [...currItems, items]
            } else {
                return currItems.filter((item) => item !== items)
            }
        })
    }

    const toggleOrder = () => {
        setSort(currItems => {
            if (currItems.order === '1') {
                return { ...currItems, order: '-1' }
            } else {
                return { ...currItems, order: '1' }
            }
        })
    }

    const clearChip = () => {
        setChip([])
        console.log(chip)
    }

    return (
        <FilterContext.Provider value={
            {
                clearChip,
                setSort,
                sort,
                toggleOrder,
                chip,
                toggleChip,
                page,
                setPage
            }
        }>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContext
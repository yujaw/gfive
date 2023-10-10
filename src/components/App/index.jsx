import { Fragment } from "react"
import Routes from "../../routes"
import { ShoppingCartProvider } from "../../context/ShoppingCartProvider"
import { FavouritesProvider } from "../../context/FavouritesProvider"
import { SearchProvider } from '../../context/SearchProvider'
import { FilterProvider } from "../../context/FilterProvider"
import { ToastProvider } from "../../context/ToastProvider"

import '../../styles/styles.css'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const App = () => {
    return (
        <Fragment>
            <ToastProvider>
                <ShoppingCartProvider>
                    <FavouritesProvider>
                        <SearchProvider>
                            <FilterProvider>
                                <Routes />
                            </FilterProvider>
                        </SearchProvider>
                    </FavouritesProvider>
                </ShoppingCartProvider>
            </ToastProvider>
        </Fragment>
    )
}

export default App
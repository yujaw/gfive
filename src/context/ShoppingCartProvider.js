import { createContext, useState } from "react"
import Cart from '../components/Cart'
import useLocalStorage from "../hooks/useLocalStorage"

const ShoppingCartContext = createContext({})

export const ShoppingCartProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage('Cart', [])
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)

    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseCartQuantity = (id, price) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1, price }];
            }
            else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return Object.assign(Object.assign({}, item), { quantity: item.quantity + 1 });
                    }
                    else {
                        return item;
                    }
                });
            }
        });
    }

    const decreaseCartQuantity = (id) => {
        setCartItems(currItems => {
            var _a;
            if (((_a = currItems.find(item => item.id === id)) === null || _a === void 0 ? void 0 : _a.quantity) === 1) {
                return currItems.filter(item => item.id !== id);
            }
            else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return Object.assign(Object.assign({}, item), { quantity: item.quantity - 1 });
                    }
                    else {
                        return item;
                    }
                });
            }
        });
    }

    const removeFromCart = (id) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id);
        });
    }

    const clearCart = () => {
        setCartItems([])
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            openCart,
            closeCart,
            clearCart,
            cartItems,
            cartQuantity,
        }}>
            {children}
            <Cart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartContext;
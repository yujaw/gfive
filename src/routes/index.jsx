import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import Home from '../components/Home'
import Layouts from '../layouts'
import PrivateLayout from '../layouts/privateLayout'
import Error from '../components/Error'
import Account from '../components/Account'
import Orders from '../components/Account/orders'
import Wish from '../components/Account/wish'
import AccountInfo from '../components/Account/accountInfo'
import ShippingInfo from '../components/Account/shippingInfo'
import Products from '../components/Product'
import SingleProduct from '../components/SingleProduct'
import SignIn from '../components/Signin'
import Signup from '../components/Signup'
import About from '../components/About'
import Contact from '../components/Contact'
import Services from '../components/Services'
import Privacy from '../components/Privacy'
import AuthLayout from '../layouts/authLayout'
import PersistLogin from '../layouts/persistLogin'
import Terms from '../components/Terms'
import Warranty from '../components/Warranty'
import Productas from '../components/Products'

const Routes = () => {
    const route = useRoutes([
        {
            element: <PersistLogin />,
            children: [
                {
                    path: '/',
                    element: <Layouts />,
                    children: [
                        {
                            element: <PrivateLayout />,
                            children: [
                                {
                                    index: true,
                                    element: <Home />
                                },
                                {
                                    element: <AuthLayout />,
                                    children: [
                                        {
                                            path: 'account',
                                            element: <Account />,
                                            children: [
                                                {
                                                    index: true,
                                                    element: <AccountInfo />
                                                },
                                                {
                                                    path: 'shippinginfo',
                                                    element: <ShippingInfo />
                                                },
                                                {
                                                    path: 'orders',
                                                    element: <Orders />
                                                },
                                                {
                                                    path: 'wishlist',
                                                    element: <Wish />
                                                },
                                                {
                                                    path: 'orders',
                                                    element: <Orders />
                                                },
                                            ]
                                        },
                                    ]
                                },
                                {
                                    path: 'products',
                                    children: [
                                        {
                                            index: true,
                                            element: <Products />
                                        },
                                        {
                                            path: ':id',
                                            element: <SingleProduct />
                                        }
                                    ]
                                },
                                {
                                    path: 'pro',
                                    element: <Productas />
                                },
                                {
                                    path: 'about',
                                    element: <About />
                                },
                                {
                                    path: 'contact',
                                    element: <Contact />
                                },
                                {
                                    path: 'services',
                                    element: <Services />
                                },
                                {
                                    path: 'privacy',
                                    element: <Privacy />
                                },
                                {
                                    path: 'terms',
                                    element: <Terms />
                                },
                                {
                                    path: 'warranty',
                                    element: <Warranty />
                                },
                                {
                                    path: '*',
                                    element: <Navigate to={'/404'} replace />
                                }
                            ]
                        }, {
                            path: '404',
                            element: <Error />
                        },
                        {
                            path: 'signin',
                            element: <SignIn />
                        },
                        {
                            path: 'signup',
                            element: <Signup />
                        },
                    ]
                }
            ]
        }
    ])

    return route
}

export default Routes
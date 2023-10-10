import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const PrivateLayout = () => {
  return (
    <Fragment>
      <Navigation />
      <Outlet />
      <Footer />
    </Fragment>
  )
}

export default PrivateLayout
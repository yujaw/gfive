import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import ScrollToTop from '../components/ScrollToTop'

const Layouts = () => {
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>G-five Technologies Pvt. Ltd.</title>
        </Helmet>
        <ScrollToTop />
        <Outlet />
      </HelmetProvider>
    </Fragment>
  )
}

export default Layouts
import React from 'react'
import './skeleton.css'

const SkeletonElement = ({ type }) => {

    const classes = `skeleton ${type}`

    return (
        <div className={classes} />
    )
}

export default SkeletonElement
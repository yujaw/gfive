import React, { Fragment } from 'react'

const Slider = ({ width, txt }) => {
    return (
        <Fragment>
            <div className='rating-cont'>
                <div className='rating-slider'>
                    <div
                        className='slide'
                        style={{ width: `${width}%` }}
                    ></div>
                </div>
                <div className='rating-no'>{txt}</div>
            </div>
        </Fragment>
    )
}

export default Slider
import React, { Fragment } from 'react'
import { FaStar } from 'react-icons/fa'

const Slider = ({ width, txt, num }) => {
    return (
        <Fragment>
            <div className='rating-cont'>
                <div className="ico">
                    <span>{num}</span>
                    <FaStar className='icon selected' />
                </div>
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
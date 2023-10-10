import React from 'react'
import SkeletonElement from './SkeletonElement'

const SingleProductSkeleton = () => {
    return (
        <div className="skeleton-wrapper">
            <div className="skeleton-single">
                <div className="left">
                    <SkeletonElement type='product' />
                </div>
            </div>
        </div>
    )
}

export default SingleProductSkeleton
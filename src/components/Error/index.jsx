import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <Fragment>
            <div className="error">
                <img src="./images/404.gif" alt="404" />
                <span className="title">Looks like you're lost</span>
                <span className="desc">Oops, the file you requested may have been moved, edited, or deleted</span>
                {/* <Link to={'/'} className="home_btn">Back Home</Link> */}
                <button className="home_btn" onClick={routeChange}>Back Home</button>
            </div>
        </Fragment>
    )
}

export default Error
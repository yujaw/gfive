import React, { Fragment, useEffect, useState, useRef } from 'react'
import { FaStar } from 'react-icons/fa'
import { Rating } from '@mui/material'
import axios from '../../api/axios'
import { useToast } from '../../hooks/useToast'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'

const UPLOAD_URI = '/api/products/review'

const Description = ({ id }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSelected, setSelected] = useState()
    const [reviews, setReviews] = useState([])
    const [revImages, setRevImages] = useState([])
    const [images, setImages] = useState([])
    const [add, setAdd] = useState(false)
    const imageRef = useRef()
    const [custreview, setCustreview] = useState({
        rating: 0,
        images: [],
        comment: ''
    })
    const { auth } = useAuth()

    const successNotification = useToast()

    const setRating = (value) => {
        setCustreview({ ...custreview, rating: value })
    }

    const setComment = (value) => {
        setCustreview({ ...custreview, comment: value })
    }

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData('text/plain');
        const updatedImages = [...custreview.images];
        const draggedImage = updatedImages[draggedIndex];

        // Remove the dragged image from its original position
        updatedImages.splice(draggedIndex, 1);

        // Insert the dragged image at the new position
        updatedImages.splice(targetIndex, 0, draggedImage);

        setImages(updatedImages);
    }

    const convertToBase64 = (e) => {
        e.preventDefault();
        const files = e?.target?.files || e?.dataTransfer?.files;
        const imagesArray = [];

        const handleLoad = (result) => {
            if (!imagesArray.includes(result)) {
                imagesArray.push(result);
                setImages((currItems) => [...currItems, result]);
            }
        }

        const loadFile = (file) => {
            const reader = new FileReader();
            reader.onload = () => handleLoad(reader.result);
            reader.readAsDataURL(file);
        }

        for (const file of files) {
            loadFile(file);
        }
    }

    const removeImage = (index) => {
        const updatedImages = images.filter((image, i) => i !== index);
        setImages(updatedImages);
    }

    useEffect(() => {
        setSelected(0)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/products/${id}`)
                setReviews(res.data.reviews)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [id, add])

    // useEffect(() => {
    //     console.log(auth)
    // })

    const submitData = async (e) => {
        e.preventDefault()

        try {
            await axios
                .post(
                    UPLOAD_URI,
                    {
                        id,
                        email: auth?.email,
                        comment: custreview.comment,
                        rate: custreview.rating,
                        images,
                    }
                ).then(
                    () => {
                        navigate(location)
                        setAdd(false)
                        successNotification("Data Uploaded Successfully")
                    }

                )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Fragment>
            <div className="description-wrapper">
                <div className="description">
                    <div className="desc-nav">
                        <button onClick={() => setSelected(0)} className={`item ${isSelected === 0 ? 'selected' : ''}`}>
                            <span>Specification</span>
                        </button>
                        <button onClick={() => setSelected(1)} className={`item ${isSelected === 1 ? 'selected' : ''}`}>
                            <span>Description</span>
                        </button>
                        <button onClick={() => setSelected(2)} className={`item ${isSelected === 2 ? 'selected' : ''}`}>
                            <span>Reviews</span>
                        </button>
                    </div>
                    {
                        isSelected === 0
                            ? (
                                <div className="spec-container">
                                    <div className="content">
                                        <div className="item">
                                            6.1-inch Super Retina XDR display
                                        </div>
                                        <div className="item">
                                            A14 Bionic chip processor
                                        </div>
                                        <div className="item">
                                            5G mmWave and sub-6GHz
                                        </div>
                                        <div className="item">
                                            Ceramic Shield protection with four times better drop performance
                                        </div>
                                        <div className="item">
                                            OLED Super Retina XDR
                                        </div>
                                        <div className="item">
                                            Dual camera (12MP) with an f2.4 ultra wide and  f1.6 wide, Night Mode available on all cameras and night time lapse
                                        </div>
                                        <div className="item">
                                            Wireless charging
                                        </div>
                                        <div className="item">
                                            6.1-inch Super Retina XDR display
                                        </div>
                                    </div>
                                </div>
                            ) : null
                    }
                    {
                        isSelected === 1
                            ? (
                                <div className="desc-container">
                                    <div className="content">
                                        Brand new factory-sealed Apple M2 MacBook Air 2022 13.6" Retina Display with LED Backlight, Second-generation Apple M2 Chip, Octa-core (8-core) CPU, 10-core GPU, 16-core Neural Engine, 8GB unified Memory, 512GB SSD Storage, Stereo speakers, FacTime HD Camera, Backlit Keyboard, Up to 18 hours of battery life, 0.63-inch, 1.29KG Weight, Comes with 1-year warranty
                                    </div>
                                </div>
                            ) : null
                    }
                    {
                        isSelected === 2
                            ? (
                                <div className="review-container">
                                    {
                                        add
                                            ? (
                                                <Fragment>
                                                    <div className="review-overlay" onClick={() => setAdd(false)} />
                                                    <div className="review-wrapper">
                                                        <div className="rev_navbar">
                                                            <div className="title">
                                                                Add Product Review
                                                            </div>
                                                        </div>
                                                        <div className="container">
                                                            <div className="input">
                                                                <div className="title">Rating</div>
                                                                <Rating
                                                                    className="ratings"
                                                                    defaultValue={0}
                                                                    value={custreview.rating}
                                                                    onChange={(e, newRating) => {
                                                                        setRating(newRating)
                                                                    }}
                                                                    icon={<FaStar className='icon selected' />}
                                                                    emptyIcon={<FaStar className='icon unselected' />}
                                                                />
                                                            </div>
                                                            <div className="input">
                                                                <div className="title">Comment</div>
                                                                <textarea name="comment" value={custreview.comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                                            </div>
                                                            <div className="input file">
                                                                <div className="title">Images</div>
                                                                <input type="file" accept='image/*' onChange={convertToBase64} multiple hidden ref={imageRef} />
                                                                {
                                                                    images?.length > 0 && (
                                                                        <div className="image_list" onDragOver={handleDragOver}>
                                                                            <Fragment>
                                                                                {
                                                                                    images.map((item, index) => (
                                                                                        <div
                                                                                            key={index}
                                                                                            className={`image-container`}
                                                                                            draggable
                                                                                            onDragStart={(e) => handleDragStart(e, index)}
                                                                                            onDrop={(e) => handleDrop(e, index)}
                                                                                        >
                                                                                            <img width={200} src={item} alt={`${index}`} />
                                                                                            <button className="remove" onClick={() => removeImage(index)}>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                                                                                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                                                                                </svg>
                                                                                            </button>
                                                                                        </div>
                                                                                    ))
                                                                                }
                                                                                <button onClick={() => imageRef.current.click()}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="1rem">
                                                                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                                                                    </svg>
                                                                                </button>
                                                                            </Fragment>
                                                                        </div>
                                                                    )}
                                                                {
                                                                    !images?.length > 0 && (
                                                                        <Fragment>
                                                                            <div className="image_upload">
                                                                                <div className="input_area" onDragOver={handleDragOver} onDrop={convertToBase64}>
                                                                                    <div className="icon">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                                                            <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div className="msg">Drag & drop files here</div>
                                                                                    <div className="sub">
                                                                                        or <button onClick={() => imageRef.current.click()}>browser files</button> from device
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Fragment>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="rev_footer">
                                                            <button className="submit" onClick={submitData}>
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            ) : null
                                    }
                                    <div className="content">
                                        {
                                            auth?.email ?
                                                (
                                                    <div className="utils">
                                                        <button className="add_btn" onClick={() => setAdd(!add)}>
                                                            <span>
                                                                Add Review
                                                            </span>
                                                        </button>
                                                    </div>
                                                ) : null
                                        }
                                        <div className="rating-container">
                                            {
                                                reviews.length > 0
                                                    ? (
                                                        reviews.map(item => (
                                                            <div className="item" key={item.id}>
                                                                <div className="desc">
                                                                    <div className="title">
                                                                        <Rating
                                                                            className="ratings"
                                                                            defaultValue={parseInt(item.rating)}
                                                                            value={parseInt(item.rating)}
                                                                            precision={0.5}
                                                                            icon={<FaStar className='icon selected' />}
                                                                            emptyIcon={<FaStar className='icon unselected' />}
                                                                            readOnly
                                                                        />
                                                                        <div className="name">{`${item.email}`}</div>
                                                                    </div>
                                                                    <div className="cont">
                                                                        {item.message}
                                                                    </div>
                                                                </div>
                                                                <div className="image-container">
                                                                    {
                                                                        item.images.map((img, index) => (
                                                                            <img key={index} src={img} alt="rating" />
                                                                        ))
                                                                    }
                                                                </div>
                                                                <div className="rev-footer">
                                                                    <span>{new Date(item.date).toLocaleDateString()}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                        )) : (
                                                        <Fragment>
                                                            <h1>No Reviews Found</h1>
                                                        </Fragment>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) : null
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default Description
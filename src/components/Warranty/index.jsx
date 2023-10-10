import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Warranty = () => {
    return (
        <Fragment>
            <div className="info-container">
                <div className="header">
                    <div className="title">Warranty</div>
                </div>
                <div className="info">
                    <div className="container">
                        <div className="sub_container">
                            <div className='sub_title'>Limited Warranty</div>
                            <div className='desc'>Gfive Technologies Pvt. Ltd. ("Gfive") warrants to the original purchaser ("Customer") that the product(s) purchased from Gfive Technologies Pvt. Ltd. will be free from defects in materials and workmanship under normal use for a specified warranty period, as outlined below.</div>

                            <div className='sub_title'>Warranty Periods</div>
                            <ol className='ordered_list'>
                                <li>
                                    <strong>Laptop and Computer Devices:</strong>
                                    <ul type='disc'>
                                        <li>Parts and Labor: One (1) year from the date of purchase.</li>
                                    </ul>
                                </li>

                                <li>
                                    <strong>Accessories (Mouse, Keyboard, Cables, etc.):</strong>
                                    <ul type='disc'>
                                        <li>Parts and Labor: Six (6) months from the date of purchase.</li>
                                    </ul>
                                </li>
                            </ol>

                            <div className='sub_title'>Warranty Coverage</div>
                            <div className='desc'>This limited warranty covers the repair or replacement of the product(s) found to be defective within the specified warranty period. The warranty applies only to defects in materials or workmanship and does not cover damage caused by accident, misuse, abuse, neglect, normal wear and tear, alteration, or improper installation.</div>

                            <div className='sub_title'>Obtaining Warranty Service</div>
                            <div className='desc'>
                                To obtain warranty service, please follow these steps:

                                <ol className='ordered_list'>
                                    <li>
                                        <strong>Contact Customer Support:</strong>
                                        <ul>
                                            <li>Contact Gfive Technologies Pvt. Ltd. Customer Support at <Link to={'mailto:info@gfive.com.np'}>info@gfive.com.np</Link> to initiate a warranty claim.</li>
                                        </ul>
                                    </li>

                                    <li>
                                        <strong>Provide Necessary Information:</strong>
                                        <ul>
                                            <li>Provide proof of purchase, product serial number, and a detailed description of the issue.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Follow Instructions:</strong>
                                        <ul>
                                            <li>Follow the instructions provided by Gfive Technologies Pvt. Ltd. Customer Support for warranty service.</li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>

                            <div className='sub_title'> Exclusions and Limitations</div>
                            <div className='desc'>
                                This warranty does not cover software, consumable items, or accessories not sold by Gfive Technologies Pvt. Ltd.
                                Gfive Technologies Pvt. Ltd. reserves the right to refuse warranty service if the product is found to have been tampered with or repaired by unauthorized personnel.
                            </div>
                            <div className='sub_title'>Disclaimer</div>
                            <div className='desc'>THE WARRANTIES PROVIDED HEREIN ARE IN LIEU OF ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.</div>

                            <div className='sub_title'>Contact Information</div>
                            <div className='desc'>
                                For any warranty-related inquiries or assistance, please contact Gfive Technologies Pvt. Ltd. Customer Support at:
                                <p>
                                    <strong>Email:</strong> <Link to={'mailto:info@gfive.com.np'}>info@gfive.com.np</Link>
                                </p>
                                <p>
                                    <strong>Phone:</strong> <Link to={'tel:'}>4466456</Link>
                                </p>
                                Thank you for choosing Gfive Technologies Pvt. Ltd. We strive to provide you with high-quality products and excellent customer service.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default Warranty
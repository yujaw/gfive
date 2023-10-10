import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Terms = () => {
    return (
        <Fragment>
            <div className="info-container">
                <div className="header">
                    <div className="title">Terms and Conditions</div>
                </div>
                <div className="info">
                    <div className="container">
                        Welcome to Gfive Technologies Pvt. Ltd. These Terms and Conditions  govern your access to and use of our website located at www.gfive.com.np. Please read these Terms carefully before using our Website.
                        <div className="sub_container">
                            <div className='sub_title'>Acceptance of Terms</div>
                            <div className='desc'>By accessing and using this Website, you agree to be bound by these Terms. If you do not agree with any provision of these Terms, you may not use the Website.</div>

                            <div className='sub_title'>Website Usage</div>
                            <div className='desc'>You may use the Website for lawful purposes and in a manner consistent with these Terms. You may not use the Website in any way that could damage, disable, overburden, or impair our servers or networks or interfere with any other party's use and enjoyment of the Website.</div>

                            <div className='sub_title'>Intellectual Property</div>
                            <div className='desc'>All content, trademarks, logos, and other intellectual property displayed or used on this Website are the property of Gfive Technologies or third parties. You may not use, copy, modify, distribute, or reproduce any of the content without prior written consent from Gfive Technologies.</div>

                            <div className='sub_title'>Privacy</div>
                            <div className='desc'>Your use of this Website is subject to our Privacy Policy, which can be found at [link to privacy policy]. By using the Website, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy.</div>

                            <div className='sub_title'>Links to Third-Party Websites</div>
                            <div className='desc'>The Website may contain links to third-party websites for your convenience. Gfive Technologies does not endorse or control these third-party websites and is not responsible for their content. Accessing any third-party website is at your own risk.</div>

                            <div className='sub_title'>Termination</div>
                            <div className='desc'>Gfive Technologies reserves the right to suspend, terminate, or restrict your access to the Website at any time without notice or liability for any reason, including for any violation of these Terms.</div>

                            <div className='sub_title'>Limitation of Liability</div>
                            <div className='desc'>Gfive Technologies will not be liable for any damages, including but not limited to direct, indirect, incidental, consequential, or punitive damages, arising out of your use or inability to use the Website.</div>

                            <div className='sub_title'>Indemnification</div>
                            <div className='desc'>You agree to indemnify, defend, and hold harmless Gfive Technologies and its affiliates, officers, directors, employees, and agents from and against all losses, expenses, damages, and costs, including reasonable attorneys' fees, resulting from your use of the Website or any violation of these Terms.</div>

                            {/* <div className='sub_title'>Governing Law</div>
                            <div className='desc'>These Terms shall be governed by and construed in accordance with the laws of [jurisdiction]. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located within [jurisdiction].</div> */}

                            <div className='sub_title'>Changes to Terms</div>
                            <div className='desc'>Gfive Technologies may modify or revise these Terms at any time without notice. Your continued use of the Website after any changes to these Terms will constitute your acceptance of such changes.</div>

                            <br />

                            <div className="desc">
                                If you have any questions or concerns regarding these Terms, please contact us at <Link to='mailto:info@gfive.com.np'>info@gfive.com.np</Link>.
                            </div>

                            <div className="foot">
                                Last updated: <span>2023/10/08</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default Terms
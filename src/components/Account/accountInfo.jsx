import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'

const AccountInfo = () => {

    const [user, setUser] = useState({})

    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosPrivate
                    .get(`/api/users/${auth?.email}`)
                    .then((res) => {
                        setUser(res.data.data)
                    })
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [auth?.email, axiosPrivate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosPrivate
                .post(`/api/users/${auth?.email}`, { user })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className='account-desc'>
                <div className='title header'>
                    <div className="utils">
                        <div className="ico" />
                        <div className="ico" />
                        <div className="ico" />
                    </div>
                    Account Info
                </div>
                <div className='container'>
                    <div className='sub_container'>
                        <div className='title'>
                            Account
                        </div>
                        <div className='items'>
                            <input type='text' placeholder='First Name' value={user.fname} onChange={e => {
                                setUser((currItems) => { return { ...currItems, fname: e.target.value } })
                            }} />
                            <input type='text' placeholder='Last Name' value={user.lname} onChange={e => {
                                setUser((currItems) => { return { ...currItems, lname: e.target.value } })
                            }} />
                        </div>
                        <div className='items'>
                            <input type='text' placeholder='Address' value={user.address} onChange={e => {
                                setUser((currItems) => { return { ...currItems, address: e.target.value } })
                            }} />
                            <input type='text' placeholder='City' value={user.city} onChange={e => {
                                setUser((currItems) => { return { ...currItems, city: e.target.value } })
                            }} />
                        </div>
                        <div className='items'>
                            <input type='number' placeholder='Zip' value={user.postalcode} onChange={e => {
                                setUser((currItems) => { return { ...currItems, postalcode: e.target.value } })
                            }} />
                        </div>
                    </div>
                </div>
                <div className='button'>
                    <button className='secondary'>Reset</button>
                    <button className='primary' onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </>
    )
}

export default AccountInfo
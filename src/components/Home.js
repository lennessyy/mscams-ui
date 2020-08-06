import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Admin from '../components/Admin'

function Homepage() {
    const user = useSelector(state => state.user)

    if (!user) {
        return <Redirect to="/login" />
    } else return <Admin />
}

export default Homepage
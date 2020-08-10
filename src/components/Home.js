import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Admin from '../components/Admin'
import StudentMain from '../components/StudentMain'

function Homepage() {
    const user = useSelector(state => state.user)

    if (!user) {
        return <Redirect to="/login" />
    } else if (user.category === 'admin') return <Admin />
    else if (user.category === 'student') return <StudentMain />
}

export default Homepage
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAppDetails } from '../actions/actionCreator'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ApplicationDetails from './ApplicationDetails'

export default function GetApplicationDetails() {
    let { id } = useParams()
    const token = useSelector(state => state._token)
    const appDetails = useSelector(state => state.fullApplications[id])
    const dispatch = useDispatch()

    // Redirect to login if no token
    if (!token) {
        Redirect('/login')
    }

    useEffect(function () {
        if (!appDetails) {
            dispatch(getAppDetails(token, id))
        }
    }, [appDetails, id, dispatch, token])
    if (!appDetails) return <p>Loading...</p>

    return (
        <ApplicationDetails application={appDetails} />
    )
}

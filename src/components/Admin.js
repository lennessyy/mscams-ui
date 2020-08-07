import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { getApplications } from '../actions/actionCreator'
import ApplicationList from './ApplicationList'

export default function Admin() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const applications = useSelector(state => state.applications)
    if (!applications || applications.length === 0) {
        dispatch(getApplications(token))
        return <p>Loading</p>
    }
    const pdfApps = applications.filter(application => application.category === 'pdf')
    const clubApps = applications.filter(application => application.category === 'club')
    return (
        <Grid container>
            <h3>Professional Development Fund Applications:</h3>
            <ApplicationList applications={pdfApps} />
            <h3>Club Funding Applications</h3>
            <ApplicationList applications={clubApps} />
        </Grid>
    )
}

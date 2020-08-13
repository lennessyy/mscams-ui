import React from 'react'
import { Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { getApplications } from '../actions/actionCreator'
import ApplicationList from './ApplicationList'
import { makeStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    category: {
        '& h3': {
            fontSize: '1.5rem',
            color: 'gray',
            marginLeft: theme.spacing(2)
        }
    }

}))

export default function Admin({ status = 'open' }) {
    const dispatch = useDispatch()
    const token = useSelector(state => state._token)

    const applications = useSelector(state => state.applications)
    const classes = useStyles()

    if (!applications || applications.length === 0) {
        dispatch(getApplications(token, status))
        return <p>Loading</p>
    }

    if (status === 'closed') {
        if (applications.some(application => application.status === "open")) {
            dispatch(getApplications(token, status))
            return <p>Loading</p>
        }
    } else if (status === 'open') {
        if (applications.some(application => application.status !== "open")) {
            dispatch(getApplications(token, status))
            return <p>Loading</p>
        }
    }

    const pdfApps = applications.filter(application => application.category === 'pdf')
    const clubApps = applications.filter(application => application.category === 'club')

    const altView = status === 'open' ? (<NavLink to='/applications/closed'>View Closed</NavLink>) : (<NavLink to='/'>View Open</NavLink>)
    return (
        <Grid className={classes.root} container>
            <Grid item className={classes.category}>
                <h3>Professional Development Fund Applications:</h3>
            </Grid>
            <ApplicationList applications={pdfApps} />

            <Grid item className={classes.category}>
                <h3>Club Funding Applications</h3>
            </Grid>
            <ApplicationList applications={clubApps} />

            <Grid item className={classes.category}>
                {altView}
            </Grid>
        </Grid>
    )
}

import React, { Suspense } from 'react'
import { Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { getApplications } from '../actions/actionCreator'
import ApplicationList from './ApplicationList'
import { makeStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import Loading from './Loading'
import { useTranslation } from 'react-i18next'

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

function AdminComponent({ status = 'open' }) {
    const dispatch = useDispatch()
    const token = useSelector(state => state._token)

    const applications = useSelector(state => state.applications)
    const classes = useStyles()
    const { t } = useTranslation()

    if (!applications || applications.length === 0) {
        dispatch(getApplications(token, status))
        return <Loading />
    }

    // If we are viewing closed applications
    if (status === 'closed') {
        // Get new applications if the curr applications aren't closed apps
        if (applications.some(application => application.status === "open")) {
            dispatch(getApplications(token, status))
            return <Loading />
        }
    } else if (status === 'open') {
        if (applications.some(application => application.status !== "open")) {
            dispatch(getApplications(token, status))
            return <Loading />
        }
    }

    const pdfApps = applications.filter(application => application.category === 'pdf')
    const clubApps = applications.filter(application => application.category === 'club')

    const altView = status === 'open' ? (<NavLink to='/applications/closed'>{t('View Closed')}</NavLink>) : (<NavLink to='/'>{t('View Open')}</NavLink>)
    return (
        <Grid className={classes.root} container>
            <Grid item className={classes.category}>
                <h3>{t('Professional Development Fund Applications')}:</h3>
            </Grid>
            <ApplicationList applications={pdfApps} />

            <Grid item className={classes.category}>
                <h3>{t('Club Funding Applications')}:</h3>
            </Grid>
            <ApplicationList applications={clubApps} />

            <Grid item className={classes.category}>
                {altView}
            </Grid>
        </Grid>
    )
}

export default function App({ status = "open" }) {
    return (<Suspense fallback="loading">
        <AdminComponent status={status} />
    </Suspense>)
} 
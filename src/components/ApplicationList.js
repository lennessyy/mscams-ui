import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Application from './Application'

const useStyles = makeStyles({
    root: {
        overflowX: 'auto',
        flexDirection: 'row',
        display: 'flex',
        minWidth: '100vw',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    }
})

export default function ApplicationList({ applications }) {
    const classes = useStyles()

    return (
        <Grid className={classes.root} items>
            {applications.map(application => <Application event={application.event} event_date={application.event_date} status={application.status} applicant={application.applicant} submitted_at={application.submitted_at} />)}
        </Grid>
    )
}

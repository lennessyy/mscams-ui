import React from 'react'
import { Grid, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Vote from './Vote'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../actions/actionCreator'


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '50vh',
        margin: '5vh 10vh',
        padding: '5vh 10vh',
        textAlign: 'left'
    },
    details: {
        height: '90%',
        '& > *': {
            margin: theme.spacing(1),
        }
    },
    title: {
        fontSize: 'large',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    textField: {
        minHeight: '5em',
        padding: '8px',
        paddingBottom: '1em'
    },
    button: {
        margin: '0 10px'
    }
}))

export default function ApplicationDetails({ application }) {
    const { id, category, amount, applicant,
        event, event_date, description, budget } = application
    const votes = useSelector(state => state.fullApplications[id].votes)
    const token = useSelector(state => state._token)
    const classes = useStyles()
    const votesDisplay = votes.length ? votes.map(vote => <Vote key={vote.voter + vote.application_id} vote={vote} />) : 'No votes have come in yet'

    const dispatch = useDispatch()
    const approve = () => {
        dispatch(vote(token, id, true))
    }
    const deny = () => {
        dispatch(vote(token, id, false))
    }

    return (
        <Paper elevation={2} className={classes.root}>
            <Grid className={classes.details} container>
                <Grid className={classes.title} item xs={12}>Application Details</Grid>
                <Grid item xs={5}><b>Amount:</b> {amount}</Grid>
                <Grid item xs={5}><b>Applicant:</b> {applicant}</Grid>
                <Grid item xs={5}><b>Event:</b> {event}</Grid>
                <Grid item xs={5}><b>Event Date:</b> {event_date}</Grid>
                <Grid item xs={12}><b>Description:</b></Grid>
                <Grid item xs={12}>
                    <Paper className={classes.textField} elevation={3}>
                        {description}
                    </Paper>
                </Grid>
                <Grid item xs={12}><b>Budget:</b></Grid>
                <Grid item xs={12}>
                    <Paper className={classes.textField} elevation={3}>
                        {budget}
                    </Paper>
                </Grid>
                <Grid item xs={12}><b>Votes:</b></Grid>
                <Grid item xs={6}>
                    {votesDisplay}
                </Grid>
                <Grid item xs={5}>
                    <Button onClick={approve} className={classes.button} variant='contained' color='primary'>Approve</Button>
                    <Button onClick={deny} className={classes.button} variant='contained' color='secondary'>Deny</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ApplicationList from './ApplicationList'
import { getUser } from '../actions/actionCreator'
import { useHistory, Redirect } from 'react-router-dom'
import Loading from './Loading'

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: 'center'
    },
    header: {
        height: '20vh',
        width: '80vw',
        color: '#0d395f',
        fontSize: '3rem',
        textAlign: 'left',
        marginTop: '1em'
    },
    applications: {
        textAlign: 'left',
        '& button': {
            backgroundColor: '#0d395f',
            color: 'white',
            marginLeft: '3em',
        },
        '& > *': {
            margin: theme.spacing(1)
        }
    }
}))

export default function StudentMain() {
    const token = useSelector(state => state._token)
    const user = useSelector(state => state.user)
    const userDetails = useSelector(state => state.currentUser)
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    if (!userDetails) {
        if (!user) {
            return <Redirect to="/login" />
        }
        dispatch(getUser(token, user.username))
        return <Loading />
    }

    return (
        <Grid className={classes.root} container>
            <Grid className={classes.header} item xs={10}>
                Welcome, {userDetails.first_name}
            </Grid>
            <Grid className={classes.applications} item xs={10}>
                <h3 style={{ display: 'inline-block' }}>My applications:</h3>
                <Button onClick={() => history.push('/applications/new')} variant='contained'> New Application </Button>
                <ApplicationList applications={userDetails.applications} />
            </Grid>
        </Grid>
    )
}

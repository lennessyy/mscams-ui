import React, { useState } from 'react'
import { Grid, TextField, FormLabel, FormControlLabel, Radio, RadioGroup, FormControl, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { submitApplication, editApplication } from '../actions/actionCreator'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        padding: '0 10vw',
        textAlign: 'left',
        '& > *': {
            margin: theme.spacing(1)
        },
        '& button': {
            backgroundColor: '#0d395f',
            color: 'white',
            marginTop: '1rem',
            marginRight: '2em'
        }
    },
    button: {
        display: 'flex',
        flexDirection: 'row-reverse'
    }
}))

export default function ApplicationForm({ application }) {
    const initialState = {
        category: '',
        amount: '',
        event: '',
        event_date: '',
        description: '',
        budget: ''
    }

    const [edit, setEdit] = useState(!!application)
    const [formData, setFormData] = useState(edit ? application : initialState)


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(data => {
            return {
                ...data,
                [name]: value
            }
        })
    }

    const classes = useStyles()
    const dispatch = useDispatch()
    const token = useSelector(state => state._token)
    const history = useHistory()

    const submit = () => {
        dispatch(submitApplication(token, formData.event, formData.event_date, formData.amount, formData.category, formData.description, formData.budget))
        history.push('/')
    }
    const editApp = () => {
        dispatch(editApplication(token, application.id, formData.event, formData.event_date, formData.amount, formData.category, formData.description, formData.budget))
        history.push('/')
    }

    const submitButton = (<Grid required item xs={12} className={classes.button}>
        <Button onClick={submit}>Submit</Button>
    </Grid>)

    const editButton = (<Grid required item xs={12} className={classes.button}>
        <Button onClick={editApp}>Finish Editing</Button>
    </Grid>)

    return (
        <Grid className={classes.root} container>
            <Grid item xs={12}>
                <h1>New Application</h1>
            </Grid>


            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Category</FormLabel>
                    <RadioGroup required row aria-label="category" name="category" value={formData.category} onChange={handleChange}>
                        <FormControlLabel value="club" control={<Radio />} label="Club Funding" />
                        <FormControlLabel value="pdf" control={<Radio />} label="Professional Development Funding" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <TextField required id="amount" onChange={handleChange} name='amount' label="Amount" type='number' value={formData.amount} />
            </Grid>
            <Grid item xs={4}>
                <TextField required id="event" onChange={handleChange} name='event' label="Event" value={formData.event} />
            </Grid>
            <Grid item xs={3}>
                <TextField required id="event_date" onChange={handleChange} name='event_date' value={formData.event_date} label="Event Date" helperText="MM/DD/YYYY" />
            </Grid>
            <Grid item xs={12}>
                <TextField required id="description" onChange={handleChange} name='description' value={formData.description} label="Description" multiline rowsMax={6} rows={6} fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField required id="budget" onChange={handleChange} name='budget' value={formData.budget} label="Budget" multiline rowsMax={6} rows={6} fullWidth />
            </Grid>

            {/* <Grid required item xs={12} className={classes.button}>
                <Button onClick={submit}>Submit</Button>
            </Grid> */}
            {edit ? editButton : submitButton}
        </Grid>
    )
}

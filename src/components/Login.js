import React, { useState } from 'react'
import { authenticate, register } from '../actions/actionCreator'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Paper, Button, ButtonGroup, Grid, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3em',
        '& .MuiPaper-root': {
            padding: '2rem'
        }
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        '& .MuiButtonGroup-root': {
            justifyContent: 'center'
        },
        '& #login': {
            margin: '8px',
            marginTop: '3rem'
        },
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioGroup: {
        display: 'block',
        '& .MuiFormGroup-root': {
            flexDirection: 'row'
        }
    }
}));

function Login() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const initialState = {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        category: 'student',
        re_password: ''
    }
    const [formData, setFormdata] = useState(initialState)
    const [view, setView] = useState('login')
    const user = useSelector(state => state.user)
    if (user) return (<Redirect to='/' />)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormdata(data => {
            return {
                ...data,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (view === 'login') {
            dispatch(authenticate(formData.username, formData.password))
        } else if (view === 'signup') {
            if (formData.password !== formData.re_password) {
                return alert('Passwords must match')
            }
            dispatch(register(formData))
        }
        setFormdata(initialState)
    }

    if (view === 'login') {
        return (
            <Grid className={classes.root}>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button onClick={() => setView('signup')}>Sign Up</Button>
                        <Button>Log in</Button>
                    </ButtonGroup>
                    <Paper>
                        <TextField name='username' value={formData.username} onChange={handleChange} id="username" label="Username" />
                        <TextField type="password" id="password" name='password' value={formData.password} onChange={handleChange} label="Password" />
                        <Button type="submit" id="login" color="primary">Login</Button>
                    </Paper>
                </form>
            </Grid>
        )
    } else return (
        <Grid className={classes.root}>

            <form onSubmit={handleSubmit} className={classes.form}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button>Sign Up</Button>
                    <Button onClick={() => setView('login')}>Log in</Button>
                </ButtonGroup>
                <Paper>
                    <TextField name='username' value={formData.username} onChange={handleChange} id="username" label="Username" />
                    <TextField type="password" id="password" name='password' value={formData.password} onChange={handleChange} label="Password" />
                    <TextField type="password" id="re_password" name='re_password' value={formData.re_password} onChange={handleChange} label="Re-enter password" />
                    <TextField type="email" id="email" name='email' value={formData.email} onChange={handleChange} label="Email" />
                    <TextField id="first_name" name='first_name' value={formData.first_name} onChange={handleChange} label="First name" />
                    <TextField id="last_name" name='last_name' value={formData.last_name} onChange={handleChange} label="Last name" />
                    <FormControl style={{ margin: '1rem' }} component="fieldset">
                        <FormLabel component="legend">Account type</FormLabel>
                        <RadioGroup className={classes.radioGroup} aria-label="Category" name="category" value={formData.category} onChange={handleChange}>
                            <FormControlLabel value="student" control={<Radio />} label="Student" />
                            <FormControlLabel value="club" control={<Radio />} label="Club" />
                        </RadioGroup>
                    </FormControl>
                    <Button type="submit" id="signup" color="primary">Sign Up</Button>
                </Paper>
            </form>
        </Grid>
    )

}

export default Login
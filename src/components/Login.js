import React, { useState, Suspense } from 'react'
import { authenticate, register } from '../actions/actionCreator'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Paper, Button, ButtonGroup, Grid, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import { useTranslation } from 'react-i18next'

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

function LoginComponent() {
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
    const isFetching = useSelector(state => state.isFetching)
    const { t } = useTranslation()

    if (isFetching) {
        return <Loading />
    }
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
                return alert(t('Passwords must match'))
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
                        <Button onClick={() => setView('signup')}>{t('Sign Up')}</Button>
                        <Button>{t('Log in')}</Button>
                    </ButtonGroup>
                    <Paper>
                        <TextField required name='username' value={formData.username} onChange={handleChange} id="username" label={t("Username")} />
                        <TextField required type="password" id="password" name='password' value={formData.password} onChange={handleChange} label={t("Password")} />
                        <Button type="submit" id="login" color="primary">{t('Login')}</Button>
                    </Paper>
                </form>
            </Grid>
        )
    } else return (
        <Grid className={classes.root}>

            <form onSubmit={handleSubmit} className={classes.form}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button>{t('Sign Up')}</Button>
                    <Button onClick={() => setView('login')}>{t('Log in')}</Button>
                </ButtonGroup>
                <Paper>
                    <TextField required name='username' value={formData.username} onChange={handleChange} id="username" label={t("Username")} />
                    <TextField required type="password" id="password" name='password' value={formData.password} onChange={handleChange} label={t("Password")} />
                    <TextField required type="password" id="re_password" name='re_password' value={formData.re_password} onChange={handleChange} label="Re-enter password" />
                    <TextField required type="email" id="email" name='email' value={formData.email} onChange={handleChange} label={t("Email")} />
                    <TextField required id="first_name" name='first_name' value={formData.first_name} onChange={handleChange} label={t("First name")} />
                    <TextField required id="last_name" name='last_name' value={formData.last_name} onChange={handleChange} label={t("Last name")} />
                    <FormControl style={{ margin: '1rem' }} component="fieldset">
                        <FormLabel component="legend">{t('Account type')}</FormLabel>
                        <RadioGroup className={classes.radioGroup} required aria-label={t("Category")} name="category" value={formData.category} onChange={handleChange}>
                            <FormControlLabel value="student" control={<Radio />} label={t("Student")} />
                            <FormControlLabel value="club" control={<Radio />} label={t("Club")} />
                        </RadioGroup>
                    </FormControl>
                    <Button type="submit" id="signup" color="primary">{t('Sign Up')}</Button>
                </Paper>
            </form>
        </Grid>
    )

}

function Login() {
    return (<Suspense fallback="en">
        <LoginComponent />
    </Suspense>)
}

export default Login
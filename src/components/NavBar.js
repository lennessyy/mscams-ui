import React, { Suspense } from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { NavLink, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { resetAll } from '../actions/actionCreator'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    Button: {
        textDecoration: 'none', color: 'white'
    },
    title: {
        flexGrow: 1,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    nav: {
        backgroundColor: '#0d395f'
    }
}));

function NavBarComponent() {
    const history = useHistory()
    const classes = useStyles()
    const user = useSelector(state => state.user)
    const reset = () => {
        history.push('/')
        dispatch(resetAll())
    }
    const { t } = useTranslation()


    const login = (<Button color="inherit"><NavLink className={classes.Button} to="/login">{t('Login')}</NavLink></Button>)
    const logout = (<Button onClick={reset} color="inherit">{t('Log Out')}</Button>)
    const dispatch = useDispatch()



    return (
        <AppBar className={classes.nav} position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <img style={{ width: '40px' }} src='../middlogo.png' alt="Middlebury logo" />
                    <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/">MSCAMS</NavLink>
                </Typography>
                {user ? logout : login}
            </Toolbar>
        </AppBar>
    )
}

export default function NavBar() {
    return (<Suspense fallback="loading">
        <NavBarComponent />
    </Suspense>)
}
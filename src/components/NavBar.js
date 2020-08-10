import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { resetAll } from '../actions/actionCreator'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    nav: {
        backgroundColor: '#0d395f'
    }
}));

export default function NavBar() {
    const classes = useStyles()
    const user = useSelector(state => state.user)
    const reset = () => {
        dispatch(resetAll())
    }

    const login = (<Button color="inherit"><NavLink style={{ textDecoration: 'none', color: 'white' }} to="/login">Login</NavLink></Button>)
    const logout = (<Button onClick={reset} color="inherit">Log Out</Button>)
    const dispatch = useDispatch()



    return (
        <AppBar className={classes.nav} position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/">MSCAMS</NavLink>
                </Typography>
                {user ? logout : login}
            </Toolbar>
        </AppBar>
    )
}

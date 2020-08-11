import React from 'react'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { deepOrange, green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    pro: {
        color: 'white',
        backgroundColor: green[500],
        margin: theme.spacing(1)
    },
    con: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        margin: theme.spacing(1)
    }
}))

export default function Vote({ vote }) {
    const stance = vote.vote
    const voter = vote.voter

    const classes = useStyles()
    return (
        <Avatar variant='rounded' className={stance ? classes.pro : classes.con}>
            {voter[0].toUpperCase()}
        </Avatar>
    )
}

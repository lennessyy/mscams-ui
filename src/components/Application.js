import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: '10px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    date: {
        marginBottom: 12,
    },
    action: {
        justifyContent: 'center'
    }
});



export default function Application({ id, event, event_date, status, applicant, submitted_at, fname, lname }) {
    const classes = useStyles()
    const history = useHistory()
    const handleClick = () => {
        history.push(`/applications/${id}`)
    }
    const { t } = useTranslation()
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {t('Submitted at')}: {submitted_at.slice(0, 10)}
                </Typography>
                <Typography variant="h5" component="h2">
                    {event}
                </Typography>
                <Typography className={classes.date} color="textSecondary">
                    {event_date}
                </Typography>
                <Typography variant="body2" component="p">
                    {fname && lname ? fname + ' ' + lname : applicant}
                </Typography>
            </CardContent>
            <CardActions className={classes.action}>
                <Button onClick={handleClick} size="small">{t(status)}</Button>
            </CardActions>
        </Card>
    )
}

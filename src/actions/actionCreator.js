import MSCAMS from '../API'
import jwt from 'jsonwebtoken'

/** Action creator for authentication */
function authenticate(username, password) {
    return function (dispatch) {
        dispatch({ type: 'FETCHING' })
        MSCAMS.authenticate(username, password).then(res => {
            let { token } = res.data
            dispatch(gotToken(token))
        }).catch(e => {
            dispatch({ type: 'Error', payload: e.message })
        })
    }
}

function gotToken(token) {
    let user = jwt.decode(token)
    return { type: 'LOG_IN', payload: { token, user } }
}

/** Action creator for registration */
function register(userData) {
    return function (dispatch) {
        dispatch({ type: "FETCHING" })
        MSCAMS.register(userData).then(res => {
            let { token } = res.data
            dispatch(gotToken(token))
        }).catch(e => {
            dispatch({ type: 'Error', payload: e.message })
        })
    }
}

/** Action creator for getting applications */
function getApplications(token, status = 'open') {
    return function (dispatch) {
        dispatch({ type: 'GET_APPLICATIONS_REQUEST' });
        MSCAMS.getApps(token, status).then((res) => {
            let applications = res
            dispatch(gotApplications(applications))
        }).catch((e) => {
            dispatch({ type: 'Error', payload: e.message })
        })
    }
}

function gotApplications(applications) {
    return { type: 'GET_APPLICATIONS', payload: applications }
}

/** Action creator for getting a single application */
function getAppDetails(token, id) {
    return async function (dispatch) {
        try {
            const appDetails = await MSCAMS.getApplicationDetails(token, id)

            dispatch(gotAppDetails(appDetails))
        } catch (e) {
            dispatch({ type: 'Error', payload: e.message })
        }
    }
}

function gotAppDetails(appDetails) {
    return { type: 'GET_APP_DETAILS', payload: appDetails }
}

/** Action creator for voting */
function vote(token, id, vote) {
    return async function (dispatch) {
        try {
            const voteInfo = await MSCAMS.vote(token, id, vote)

            dispatch(castVote(voteInfo))
        } catch (e) {
            dispatch({ type: 'Error', payload: e.message })
        }
    }
}

function changeVote(token, id, vote) {
    return async function (dispatch) {
        try {
            const voteInfo = await MSCAMS.changeVote(token, id, vote)

            dispatch(changedVote(voteInfo))
        } catch (e) {
            dispatch({ type: 'Error', payload: e.message })
        }
    }
}

// cast as in past tense
function castVote(voteInfo) {
    return { type: 'VOTE', payload: voteInfo }
}

function changedVote(voteInfo) {
    return { type: 'CHANGE_VOTE', payload: voteInfo }
}

// Get individual user and their apps
function getUser(token, username) {
    return async function (dispatch) {
        try {
            const userInfo = await MSCAMS.getUser(token, username)

            dispatch(gotUser(userInfo))
        } catch (e) {
            dispatch({ type: 'Error', payload: e.message })
        }
    }
}

function gotUser(userInfo) {
    return { type: 'GET_CURRENT_USER', payload: userInfo }
}

/** Submit an application */
function submitApplication(token, event, event_date, amount, category, description, budget) {
    return function (dispatch) {
        dispatch({ type: "FETCHING" })
        MSCAMS.submitApplication(token, event, event_date, description, budget, amount, category).then(application => {
            dispatch(submittedApplication(application))
        }).catch(e => {
            dispatch({ type: 'Error', payload: e.message })
        })
    }
}

function submittedApplication(application) {
    return { type: 'SUBMIT_APPLICATION', payload: application }
}

function editApplication(token, id, event, event_date, amount, category, description, budget) {
    return function (dispatch) {
        dispatch({ type: "FETCHING" })
        MSCAMS.editApplication(token, id, event, event_date, description, budget, amount, category).then(application => {
            dispatch(editedApplication(application))
        }).catch(e => {
            dispatch({ type: 'Error', payload: e.message })
        })
    }
}

function editedApplication(application) {
    return { type: 'EDIT_APPLICATION_SUCCESS', payload: application }
}

function resetAll() {
    return { type: 'RESET_ALL' }
}


export { authenticate, register, getApplications, getAppDetails, vote, changeVote, getUser, submitApplication, editApplication, resetAll }
import MSCAMS from '../API'
import jwt from 'jsonwebtoken'

/** Action creator for authentication */
function authenticate(username, password) {
    return async function (dispatch) {
        try {
            const res = await MSCAMS.authenticate(username, password)

            let { token } = res.data

            dispatch(gotToken(token))
        } catch (e) {
            console.log(e)
        }
    }
}

function gotToken(token) {
    let user = jwt.decode(token)
    return { type: 'LOG_IN', payload: { token, user } }
}

/** Action creator for registration */
function register(userData) {
    return async function (dispatch) {
        try {
            const res = await MSCAMS.register(userData)

            let { token } = res.data
            dispatch(gotToken(token))
        } catch (e) {
            console.log(e)
        }
    }
}

/** Action creator for getting applications */
function getApplications(token) {
    return async function (dispatch) {
        try {
            const res = await MSCAMS.getApps(token)

            let applications = res
            dispatch(gotApplications(applications))
        } catch (e) {
            console.log(e)
        }
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
            console.log(e)
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
            console.log(e)
        }
    }
}

// cast as in past tense
function castVote(voteInfo) {
    return { type: 'VOTE', payload: voteInfo }
}

export { authenticate, register, getApplications, getAppDetails, vote }
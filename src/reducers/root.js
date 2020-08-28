const INITIAL_STATE = {
    _token: localStorage.getItem('_token'),
    user: JSON.parse(localStorage.getItem('user')) || null,
    applications: [],
    fullApplications: {},
    isFetching: false
}

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOG_IN':
            localStorage.setItem('_token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            return { ...state, isFetching: false, _token: action.payload.token, user: action.payload.user }
        case 'GET_APPLICATIONS':
            // if no apps come back from request
            // better way of handling this?
            if (action.payload.length === 0) {
                return { ...state, applications: ['out'] }
            }
            return { ...state, isFetching: false, applications: action.payload }
        case 'GET_APPLICATIONS_REQUEST':
            return { ...state, isFetching: true }
        case 'GET_APP_DETAILS':
            return { ...state, fullApplications: { ...state.fullApplications, isFetching: false, [action.payload.id]: action.payload } }
        case 'VOTE':
            let application = state.fullApplications[action.payload.application_id]
            application.votes = [...application.votes, action.payload]
            let newFullApplications2 = {
                ...state.fullApplications,
                [action.payload.application_id]: application
            }
            return { ...state, fullApplications: newFullApplications2 }
        case 'CHANGE_VOTE':
            let application2 = state.fullApplications[action.payload.application_id]
            application2.votes = application2.votes.map(vote => vote.voter === action.payload.voter ? action.payload : vote)
            return {
                ...state, fullApplications: {
                    ...state.fullApplications,
                    [action.payload.application_id]: application2
                }
            }
        case 'GET_CURRENT_USER':
            return { ...state, currentUser: action.payload }
        case 'SUBMIT_APPLICATION':
            let userApplications = state.currentUser.applications
            userApplications = [...userApplications, action.payload]
            let currUser = { ...state.currentUser, applications: userApplications }
            return { ...state, isFetching: false, currentUser: currUser }
        case 'EDIT_APPLICATION_SUCCESS':
            let editedApplications = state.currentUser.applications.filter(application => application.id !== action.payload.id)
            editedApplications.push(action.payload)
            let newFullApplications4 = state.fullApplications
            newFullApplications4 = {
                ...state.fullApplications,
                [action.payload.id]: action.payload
            }
            let currUser2 = { ...state.currentUser, applications: editedApplications }
            return { ...state, isFetching: false, currentUser: currUser2, fullApplications: newFullApplications4 }
        case 'RESET_ALL':
            localStorage.removeItem('_token')
            localStorage.removeItem('user')
            return { ...INITIAL_STATE, _token: null, user: null }
        case 'Error':
            alert(`Error: ${action.payload}`)
            return { ...state, isFetching: false }
        case 'FETCHING':
            return { ...state, isFetching: true }
        default:
            return state
    }
}

export default rootReducer
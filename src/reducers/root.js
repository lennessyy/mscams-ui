
const INITIAL_STATE = {
    _token: localStorage.getItem('_token'),
    user: JSON.parse(localStorage.getItem('user')) || null,
    applications: [],
    fullApplications: {}
}

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOG_IN':
            localStorage.setItem('_token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            return { ...state, _token: action.payload.token, user: action.payload.user }
        case 'GET_APPLICATIONS':
            return { ...state, applications: action.payload }
        case 'GET_APP_DETAILS':
            let newFullApplications
            newFullApplications = {
                ...state.fullApplications,
                [action.payload.id]: action.payload
            }
            return { ...state, fullApplications: newFullApplications }
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
            let newFullApplications3 = {
                ...state.fullApplications,
                [action.payload.application_id]: application2
            }
            return { ...state, fullApplications: newFullApplications3 }
        case 'GET_CURRENT_USER':
            return { ...state, currentUser: action.payload }
        case 'SUBMIT_APPLICATION':
            let userApplications = state.currentUser.applications
            userApplications = [...userApplications, action.payload]
            let currUser = { ...state.currentUser, applications: userApplications }
            return { ...state, currentUser: currUser }
        case 'EDIT_APPLICATION':
            let editedApplications = state.currentUser.applications.filter(application => application.id !== action.payload.id)
            editedApplications.push(action.payload)
            let newFullApplications4 = state.fullApplications
            newFullApplications4 = {
                ...state.fullApplications,
                [action.payload.id]: action.payload
            }
            let currUser2 = { ...state.currentUser, applications: editedApplications }
            return { ...state, currentUser: currUser2, fullApplications: newFullApplications4 }
        case 'RESET_ALL':
            localStorage.removeItem('_token')
            localStorage.removeItem('user')
            return { ...INITIAL_STATE, _token: null, user: null }
        case 'Error':
            alert(`Error: ${action.payload}`)
            return state
        default:
            return state
    }
}

export default rootReducer
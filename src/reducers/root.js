
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
            application.votes.push(action.payload)
            let newFullApplications2 = {
                ...state.fullApplications,
                [action.payload.application_id]: application
            }
            return { ...state, fullApplications: newFullApplications2 }
        default:
            return state
    }
}

export default rootReducer
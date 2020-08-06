
const INITIAL_STATE = {
    _token: localStorage.getItem('_token'),
    user: JSON.parse(localStorage.getItem('user')) || null
}

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOG_IN':
            localStorage.setItem('_token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            return { ...state, _token: action.payload.token, user: action.payload.user }
        case 'GET_APPLICATIONS':
            return { ...state, applications: action.payload }
        default:
            return state
    }
}

export default rootReducer
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
}

const userReducer = (action, state = INITIAL_STATE) => {
    switch (action.type) {
        case 'LOG_IN':
            localStorage.setItem('_token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            return { ...state, _token: action.payload.token, user: action.payload.user }
        default:
            return state
    }
}
const INITIAL_STATE = {
    applications: [],
    fullApplications: {},
    isFetching: false
}

const applicationReducer = (action, state = INITIAL_STATE) => {
    switch (action.type) {
        case 'GET_APPLICATIONS_REQUEST':
            return { ...state, isFetching: true }
        case 'GET_APPLICATIONS_SUCCESS':
            return { ...state, isFetching: false, applications: action.paylod }
        case "GET_APPLICATIONS_FAILURE":
            return { ...state, isFetching: false, error: action.payload }
        case "GET_APPLICATION_DETAILS_REQUEST":
            return { ...state, isFetching: true }
        case "GET_APPLICATION_DETAILS_SUCCESS":
            return { ...state, isFetching: false, fullApplications: { ...state.fullApplications, [action.payload.id]: action.payload } }
        case "GET_APPLICATION_DETAILS_FAILURE":
            return { ...state, isFetching: false, error: action.payload }
        case "VOTE_REQUEST":
            return { ...state, isFetching: true }
        case "VOTE_SUCCESS":
            return { ...state, isFetching: false, }
    }
}
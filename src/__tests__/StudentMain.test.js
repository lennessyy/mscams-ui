import React from 'react';
import { render } from '@testing-library/react';
import StudentMain from '../components/StudentMain';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import thunk from "redux-thunk";

const mockStore = configureStore([thunk])

let store

store = mockStore({
    _token: null,
    user: { username: 'lennessy' },
    applications: [],
    fullApplications: {}
})

test('it renders without crashing', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StudentMain />
            </MemoryRouter>
        </Provider>
    )
})
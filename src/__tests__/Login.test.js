import React from 'react';
import { render } from '@testing-library/react';
import Login from '../components/Login';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import thunk from "redux-thunk";

const mockStore = configureStore([thunk])

let store

store = mockStore({
    _token: null,
    user: null,
    applications: [],
    fullApplications: {}
})

test('it renders without crashing', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </Provider>
    )
})
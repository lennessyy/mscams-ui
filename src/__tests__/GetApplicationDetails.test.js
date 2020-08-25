import React from 'react';
import { render } from '@testing-library/react';
import GetApplicationDetails from '../components/GetApplicationDetails';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter, Route } from 'react-router-dom'
import thunk from "redux-thunk";

const mockStore = configureStore([thunk])

let store

store = mockStore({
    _token: 'faketoken',
    user: null,
    applications: [],
    fullApplications: {}
})

test('it renders without crashing', () => {
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['applications/1']}>
                <Route path="applications/:id">
                    <GetApplicationDetails />
                </Route>
            </MemoryRouter>
        </Provider>
    )
})
import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

class MSCAMS {
    static async authenticate(username, password) {
        try {
            const result = await axios.post(`${BASE_URL}/login`, { username, password })
            console.log(result)
            return result
        } catch (e) {
            console.log(e)
        }
    }

    static async register({ username, category, email, first_name, last_name, password }) {
        try {
            const result = await axios.post(`${BASE_URL}/users`, {
                username, category, email, first_name, last_name, password
            })
            return result
        } catch (e) {
            console.log(e)
        }
    }

    static async getApps(token, status = 'open') {
        const result = await axios.get(`${BASE_URL}/applications`, { params: { _token: token, status } })
        return result.data.applications
    }

    static async getApplicationDetails(token, id) {
        const result = await axios.get(`${BASE_URL}/applications/${id}`, { params: { _token: token } })
        return result.data.application
    }

    static async vote(token, id, vote) {
        const result = await axios.post(`${BASE_URL}/applications/${id}/vote`, {
            _token: token, vote: vote
        })
        return result.data.voted
    }

    static async changeVote(token, id, vote) {
        const result = await axios.put(`${BASE_URL}/applications/${id}/vote`, {
            _token: token, vote: vote
        })
        return result.data.voted
    }

    static async getUser(token, username) {
        const result = await axios.get(`${BASE_URL}/users/${username}`, {
            params: {
                _token: token
            }
        })
        return result.data.user
    }

    static async submitApplication(token, event, event_date, description, budget, amount, category) {
        amount = Number(amount)
        const result = await axios.post(`${BASE_URL}/applications`, {
            _token: token,
            event, event_date, description, budget, amount, category
        })
        return result.data.application
    }

    static async editApplication(token, id, event, event_date, description, budget, amount, category) {
        amount = Number(amount)
        const result = await axios.patch(`${BASE_URL}/applications/${id}`, {
            _token: token,
            event, event_date, description, budget, amount, category
        })
        return result.data.application
    }
}

export default MSCAMS
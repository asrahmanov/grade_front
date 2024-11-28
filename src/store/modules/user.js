import axios from "axios"

const user = {
    state: {
        user: {},
    },
    actions: {
        async fetchUser(context, payload) {
            try {
                let url = import.meta.env.VITE_API_GRADE + '/api/user/get'

                let res = await axios({
                    method: 'GET',
                    url,
                    headers: {
                        Authorization: `Bearer ${payload.authToken}`
                    }
                })

                let user = res.data.data
                context.commit('setUser', user)
            } catch (e) {
                console.log(`Ошибка в user.js/fetchUser:`, e.message)
            }
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    getters: {
        getUser(state) {
            return state.user
        }
    }
}

export default user
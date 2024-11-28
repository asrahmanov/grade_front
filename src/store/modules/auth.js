import axios from "axios"
import VueCookies from "vue-cookies"

const auth = {
    state: {
        authToken: $cookies.get('authToken'),
    },
    actions: {
        async fetchSignIn(context, payload) {
            try {
                let url = import.meta.env.VITE_API_GRADE + '/api/login'
                let auth = await axios({
                    method: 'POST',
                    url,
                    params: {
                        email: payload.email.value,
                        password: payload.password.value
                    }
                })

                let authToken = auth.data.data.token

                context.commit('setAuthToken', authToken)
                $cookies.set('authToken', authToken)

                return auth.data
            } catch (e) {
                console.log(`Ошибка в auth.js/fetchSignIn:`, e.message)
            }
        }
    },
    mutations: {
        setAuthToken(state, payload) {
            state.authToken = payload
        },
    },
    getters: {
        getAuthToken(state) {
            return state.authToken
        }
    }
}

export default auth
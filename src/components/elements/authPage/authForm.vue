<template>
    <div class="auth">
        <div class="auth-form">
            <form class="auth-form_content" @submit.prevent="send">
                <div class="auth-form_image">
                    <img
                        src="/src/assets/images/svg/logo.svg"
                        alt="fs_logo"
                    />
                </div>
                <v-text-field
                    class="auth-form_input"
                    label="Логин"
                    name="login"
                    v-model="email"
                    :rules="emailRules"
                    variant="underlined"
                    autocomplete="on"
                ></v-text-field>
                <v-text-field
                    class="auth-form_input"
                    label="Пароль"
                    type="password"
                    name="password"
                    :rules="passwordRules"
                    v-model="password"
                    variant="underlined"
                    autocomplete="on"
                ></v-text-field>
                <v-btn
                    variant="tonal"
                    type="submit"
                    :disabled="loading"
                    :loading="loading"
                    size="large"
                    rounded="lg"
                    class="auth-form_button"
                >
                    Войти
                </v-btn>
            </form>
            <!-- <div class="auth-form_content">
                <div class="auth-form_image">
                    <img
                        src="/src/assets/images/svg/logo.svg"
                        alt="fs_logo"
                    />
                </div>
                <material-input
                    class="auth-form_input"
                    label="Логин"
                    v-model="email"
                    @blur="emailValidation"
                    :error="!validation.email"
                    errorMessage="Некорректный адрес электронной почты"
                />
                <material-input
                    class="auth-form_input"
                    label="Пароль"
                    type="password"
                    @blur="passwordValidation"
                    :error="!validation.password"
                    errorMessage="Длина пароля должна быть не менее 6 символов"
                    v-model="password"
                />
                <material-button
                    class="auth-form_button"
                    button-text="Войти"
                    @click="send"
                />
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";
import router from "../../../router/router.js";
import materialInput from "/src/components/ui_elements/materialInput.vue"
import materialButton from "../../ui_elements/materialButton.vue";
import { validateEmail } from "../../../helpers/validate.js";

const store = useStore()
const email = ref('')
const password = ref('')
const validation = ref({
    email: true,
    password: true,
})
const loading = ref(false)

const emailRules = [
    () => {
        emailValidation()
        return validation.value.email ? true : 'Некорректный адрес электронной почты'
    }
]

const passwordRules = [
    () => {
        passwordValidation()
        return validation.value.password ? true : 'Длина пароля должна быть не менее 6 символов'
    }
]

function emailValidation() {
    validation.value.email = !!validateEmail(email.value);
}

function passwordValidation() {
    validation.value.password = password.value.length >= 8
}

async function initUser() {
    let authToken = store.getters.getAuthToken
    await store.dispatch('fetchUser', { authToken })
}
async function send() {
    loading.value = true
    emailValidation()
    passwordValidation()

    if (validation.value.password && validation.value.email) {
        let res = await store.dispatch('fetchSignIn', {email, password})
        if (res.success === 200) {
            loading.value = false
            await initUser()
            await router.push('/')
        } else {
            loading.value = false
        }
    } else {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.auth {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    overflow: auto;
    z-index: 9999;

    &-form {
        margin: auto;
        border-radius: 8px;
        background: #ffffff;

        &_content {
            margin: 16px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 420px;
        }

        &_image {
            display: flex;
            justify-content: center;
            margin: 16px 0 32px 0;

            img {
                width: 150px;
            }
        }

        &_input {
            margin-bottom: 10px;
            width: 90%
        }

        &_button {
            width: 65%;
            background: #ffe100;
            font-size: 16px;

            :deep(.v-btn__underlay) {
                opacity: 0;
            }
            :deep(.v-btn__content) {
                text-transform: capitalize;
            }
            &.v-btn--disabled {
                opacity: 0.6;
            }
        }
    }
}
</style>
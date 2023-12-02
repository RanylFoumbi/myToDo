<template>
  <v-sheet style="height: 100%; background: linear-gradient(#433e90 50%, white 50%)">
    <v-container style="height: 100%" class="d-flex">
      <v-row align="center" class="">
        <v-card class="mx-auto pa-3 pb-8 rounded-xl" elevation="20" width="500">
          <form @submit.prevent="handleRegister" class="pa-3">
            <h3 class="login-text">Création de compte</h3>
            <v-text-field
              label="Pseudo"
              :readonly="loading"
              v-model="user.username"
              class="mb-6"
              placeholder="Votre pseudo"
              :error-messages="errors.username"
            ></v-text-field>
            <v-text-field
              label="Email"
              :readonly="loading"
              v-model="user.email"
              class="mb-6"
              placeholder="Votre adresse mail"
              :error-messages="errors.email"
            ></v-text-field>
            <v-text-field
              label="Mot de passe"
              :readonly="loading"
              v-model="user.password"
              :type="showPwd ? 'text' : 'password'"
              placeholder="Votre mot de passe"
              class="mb-6"
              :error-messages="errors.password"
              @click:append-inner="showPwd = !showPwd"
              :append-inner-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
            ></v-text-field>
            <v-btn
              type="submit"
              :disabled="loading"
              block
              color="#433e90"
              :loading="loading"
              class="login-btn rounded-xl"
              flat
            >
              Creer un compte
            </v-btn>
            <v-btn
              block
              :disabled="loading"
              :loading="loading"
              to="/login"
              color="#433e90"
              variant="outlined"
              class="rounded-xl"
              flat
            >
              Se connecter
            </v-btn>
            <p class="tnc ma-2">
              En vous inscrivant, vous acceptez nos <a>politique de confidentialité</a> et
              <a>Conditions générales d'utilisation</a>
            </p>
          </form>
        </v-card>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import * as yup from 'yup'

export default {
  name: 'RegisterPage',
  components: {},
  data() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const signupFormschema = yup.object().shape({
      username: yup
        .string()
        .required('Username is required!')
        .min(3, 'Must be at least 3 characters!')
        .max(20, 'Must be maximum 20 characters!'),
      email: yup
        .string()
        .required('Email is required!')
        .email()
        .matches(emailRegex, 'Email invalide!'),
      password: yup
        .string()
        .required('Password is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!')
    })

    return {
      showPwd: false,
      message: '',
      user: {
        email: '',
        username: '',
        password: ''
      },
      errors: {
        email: '',
        username: '',
        password: ''
      },
      signupFormschema
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn
    },
    loading() {
      return this.$store.state.auth.loadingRegister
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/dashboard')
    }
    console.log({ store: this.$store })
  },
  methods: {
    handleRegister() {
      this.signupFormschema
        .validate(this.user, { abortEarly: false })
        .then(async () => {
          this.errors = {}
          await this.$store.dispatch('auth/register', this.user)
        })
        .catch((err) => {
          // console.log({ err })
          err.inner.forEach((error) => {
            this.errors[error.path] = error.message
          })
        })
    }
  }
}
</script>

<style scoped></style>

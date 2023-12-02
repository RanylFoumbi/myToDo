<template>
  <v-sheet style="height: 100%; background: linear-gradient(#433e90 50%, white 50%)">
    <v-container style="height: 100%" class="d-flex flex-column">
      <v-row align="center">
        <v-card class="mx-auto pa-3 pb-8 rounded-xl" elevation="20" width="500">
          <form @submit.prevent="handleLogin" class="pa-3">
            <h3 class="login-text">Se connecter</h3>
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
              Se connecter
            </v-btn>
            <v-btn
              block
              :disabled="loading"
              to="/register"
              color="#433e90"
              variant="outlined"
              class="rounded-xl"
              flat
            >
              Creer un compte
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
  name: 'LoginPage',
  components: {},
  data() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const loginFormSchema = yup.object().shape({
      email: yup.string().email().matches(emailRegex, 'Email invalide!').required('Email requis!'),
      password: yup.string().min(6).required('Mot de passe requis!')
    })

    return {
      showPwd: false,
      user: {
        email: '',
        password: ''
      },
      errors: {
        email: '',
        password: ''
      },
      loginFormSchema
    }
  },
  computed: {
    loading() {
      return this.$store.getters['auth/loadingLogin']
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/dashboard')
    }
    console.log({ store: this.$store })
  },
  methods: {
    handleLogin() {
      this.loginFormSchema
        .validate(this.user, { abortEarly: false })
        .then(() => {
          this.errors = {}
          this.$store.dispatch('auth/login', this.user)
        })
        .catch((err) => {
          // console.log({ err })
          err.inner.forEach((error) => {
            this.errors[error.path] = error.message
          })
        })
    },
    redirect() {
      this.$router.push('/register')
    }
  }
}
</script>

<style>
img {
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.login-text {
  margin: 25px 0px;

  text-align: center;
  font-size: xx-large;
}
.login-btn {
  height: 50px !important;
  margin: 20px 0;
}

.tnc {
  font-size: 10px;
}
</style>

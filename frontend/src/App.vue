<template>
  <v-app>
    <Navbar v-if="loggedIn" />
    <v-main>
      <router-view />
    </v-main>
    <FooterPage v-if="loggedIn" />
  </v-app>
</template>

<script>
import Navbar from './components/NavBar.vue'
import FooterPage from './components/FooterPage.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    FooterPage
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn
    }
  },
  data: () => ({
    contentClass: ''
  })
}
</script>

<style scoped>
.shifted-content {
  margin-left: 300px;
  transition: margin-left 0.2s;
}
</style>

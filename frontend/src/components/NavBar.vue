<template>
  <nav>
    <v-app-bar flat app color="#433e90">
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase grey--text">
        <div class="">
          <span class="font-weight-light">my</span>
          <span>ToDo</span>
        </div>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout">
        <span>Sign out</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="#433e90">
      <div class="mt-5 d-flex justify-center">
        <v-avatar
              size="160"
              :style="{
                backgroundColor: getRandomAvatar(user.username).color,
                borderColor: 'blue'
              }"
            >
              <span class="font-weight-bold text-h5">{{
                getRandomAvatar(user.username).initials
              }}</span>
            </v-avatar>
      </div>
      <v-list>
        <v-list-item class="white--text text-center my-3">
          <v-list-item-title class="">{{ user.email }}</v-list-item-title>
          <v-list-item-title class="">{{ user.username }}</v-list-item-title>
        </v-list-item>
        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.name"
            :to="link.route"
            :class="{ 'active-item': $route.path === link.route }"
            :prepend-icon="link.icon"
            :title="link.name"
          ></v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      drawer: false,
      title: '',
      links: [
        { icon: 'mdi-view-dashboard', name: 'Dashboard', route: '/dashboard' },
        { icon: 'mdi-checkbox-marked-circle-plus-outline', name: 'Mes taches', route: '/tasks' }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },
  mounted() {
    if (this.user.role === 'ADMIN') {
      this.links.push({ icon: 'mdi-account-multiple', name: 'Utilisateurs', route: '/team' })
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
    getRandomAvatar(name) {
      const initials = name.slice(0, 2).toUpperCase()

      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)

      return {
        initials: initials,
        color: randomColor
      }
    }
  }
}
</script>

<style scoped>
.v-app-bar-title__placeholder,
.v-app-bar-title__content {
  text-overflow: clip !important;
  overflow: visible !important;
}
.active-item {
  background-color: #ffa500;
  color: #fff;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>

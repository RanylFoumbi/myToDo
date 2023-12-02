<template>
  <div>
    <v-col xs12 md6 class="ma-3 align-center">
      <h1 class="grey--text">Utilisateurs({{ totalUsers }})</h1>
    </v-col>
    <v-layout row wrap>
      <v-col v-for="user in users" :key="user.id">
        <v-card class="ma-3">
          <div class="d-flex justify-center pt-4 pb-2">
            <v-avatar
              size="100"
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
          <div class="d-flex justify-center">
            <v-card-title class="pa-0">{{ user.username }}</v-card-title>
          </div>
          <v-card-subtitle class="text-center pa-0">{{ user.email }}</v-card-subtitle>
          <v-card-actions class="d-flex align-center justify-center pb-3">
            <v-btn depressed>
              <v-icon left>mdi-message</v-icon>
              <span>Message</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  async mounted() {
    this.$store.dispatch('auth/getAllUsers')
  },
  computed: {
    loading() {
      return this.$store.getters['auth/loadingGetUsers']
    },
    users() {
      return this.$store.getters['auth/allUsers']
    },
    totalUsers() {
      return this.users.length
    }
  },
  methods: {
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

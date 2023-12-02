<template>
  <div class="team">
    <v-container>
      <h1 class="text-h3 grey--text ma-3">Dashboard</h1>
      <v-row row wrap>
        <v-responsive>
          <v-col sm6 xs12 md6 lg3>
            <v-card class="ma-3" elevation="5">
              <v-list-item>
                <v-sheet
                  color="blue"
                  class="pa-1"
                  align="center"
                  width="80"
                  height="70"
                  elevation="4"
                >
                  <v-icon color="white" size="50">mdi-chart-bar</v-icon>
                </v-sheet>

                <v-list-item-title class="mb-1 text-right text-h4 font-weight-bold">{{
                  String(totalTask.length).padStart(2, '0')
                }}</v-list-item-title>
                <div><v-divider></v-divider></div>
              </v-list-item>
              <v-card-actions class="justify-center">
                <div class="px-2 font-weight-bold text-grey">Total des tâches</div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-responsive>
        <v-responsive>
          <v-col sm6 xs12 md6 lg3>
            <v-card class="ma-3" elevation="5">
              <v-list-item>
                <v-sheet
                  color="pink"
                  class="pa-1"
                  align="center"
                  width="80"
                  height="70"
                  elevation="4"
                >
                  <v-icon color="white" size="50">mdi-checkbox-marked-circle-plus-outline</v-icon>
                </v-sheet>

                <v-list-item-title class="mb-1 text-right text-h4 font-weight-bold">{{
                  countTaskByStatus('TODO')
                }}</v-list-item-title>
                <div><v-divider></v-divider></div>
              </v-list-item>
              <v-card-actions class="justify-center">
                <div class="px-2 font-weight-bold text-grey">Tâches à faire</div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-responsive>
        <v-responsive>
          <v-col sm6 xs12 md6 lg3>
            <v-card class="ma-3" elevation="5">
              <v-list-item>
                <v-sheet
                  color="orange"
                  class="pa-1"
                  align="center"
                  width="80"
                  height="70"
                  elevation="4"
                >
                  <v-icon color="white" size="50">mdi-progress-clock</v-icon>
                </v-sheet>

                <v-list-item-title class="mb-1 text-right text-h4 font-weight-bold">{{
                  countTaskByStatus('DOING')
                }}</v-list-item-title>
                <div><v-divider></v-divider></div>
              </v-list-item>
              <v-card-actions class="justify-center">
                <div class="px-2 font-weight-bold text-grey">Tâches en cours</div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-responsive>
        <v-responsive>
          <v-col sm6 xs12 md6 lg3>
            <v-card class="ma-3" elevation="5">
              <v-list-item>
                <v-sheet
                  color="#F44336"
                  class="pa-2"
                  align="center"
                  width="80"
                  height="70"
                  elevation="4"
                >
                  <v-icon color="white" size="45">mdi-block-helper</v-icon>
                </v-sheet>

                <v-list-item-title class="mb-1 text-right text-h4 font-weight-bold">{{
                  countTaskByStatus('BLOCKED')
                }}</v-list-item-title>
                <div><v-divider></v-divider></div>
              </v-list-item>
              <v-card-actions class="justify-center">
                <div class="px-2 font-weight-bold text-grey">Tâches bloquées</div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-responsive>
        <v-responsive>
          <v-col sm6 xs12 md6 lg3>
            <v-card class="ma-3" elevation="5">
              <v-list-item>
                <v-sheet
                  color="#14C31D"
                  class="pa-1"
                  align="center"
                  width="80"
                  height="70"
                  elevation="4"
                >
                  <v-icon color="white" size="50">mdi-check-all</v-icon>
                </v-sheet>

                <v-list-item-title class="mb-1 text-right text-h4 font-weight-bold">{{
                  countTaskByStatus('DONE')
                }}</v-list-item-title>
                <div><v-divider></v-divider></div>
              </v-list-item>
              <v-card-actions class="justify-center">
                <div class="px-2 font-weight-bold text-grey">Tâches Terminées</div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-responsive>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dashboardItems: [
        { icon: 'mdi-account', title: 'Total', number: 150 },
        { icon: 'mdi-chart-bar', title: 'A faire', number: 5432 },
        { icon: 'mdi-chart-bar', title: 'En cours', number: 5432 },
        { icon: 'mdi-currency-usd', title: 'Terminée', number: '$12,345' }
      ]
    }
  },
  created() {},
  async mounted() {
    this.$store.dispatch('task/getAllTask')
    this.countTaskByStatus()
  },
  computed: {
    totalTask() {
      return this.$store.getters['task/allTasks']
    }
  },
  methods: {
    countTaskByStatus(cardState) {
      return String(this.totalTask.filter((elt) => elt.state === cardState)?.length).padStart(
        2,
        '0'
      )
    }
  }
}
</script>

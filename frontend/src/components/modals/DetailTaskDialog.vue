<template>
  <v-dialog
    max-width="700px"
    transition="dialog-top-transition"
    v-model="isDialogOpen"
    :props="task"
    :close-on-back="false"
  >
    <v-card>
      <v-card-title class="card-header d-flex justify-space-between">
        <h4 class="">Détails de la tâche</h4>
        <v-icon class="" @click="closeDetailTaskDialog">mdi-close</v-icon>
      </v-card-title>

      <v-card-text class="pa-5">
        <v-row cols="12" class="mb-2" row wrap>
          <v-col cols="8" class="pb-1 text-left">
            <div class="text-grey">Titre</div>
            <div class="text-body font-weight-medium">{{ task.name }}</div>
          </v-col>
          <v-col cols="4" class="pb-1 text-right">
            <div class="text-grey">Responsable</div>
            <div class="text-body text-warning font-weight-bold font-italic">
              {{ task.userId.username }}
            </div>
          </v-col>
        </v-row>
        <v-row cols="12" row wrap>
          <v-col class="pb-1">
            <div class="text-grey">Description</div>
            <div class="text-body font-weight-medium">{{ task.description }}</div>
          </v-col>
        </v-row>
        <v-row row wrap>
          <v-col class="pb-1">
            <div class="">Priorité</div>
            <v-chip :color="task.priority === 'HIGH' ? '#ffa500' : ''" text-color="white">
              {{ task.priority }}
              <v-icon v-if="task.priority === 'HIGH'" color="white">mdi-star</v-icon>
            </v-chip>
          </v-col>
          <v-col class="pb-1 text-left">
            <div class="">Status</div>
            <v-chip :class="`white--text ${task.state}`">
              {{ task.state }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row cols="12" row wrap>
          <v-col class="pb-1">
            <div class="">Crée le:</div>
            <v-chip color="">
              {{ formatDate(task.createdAt) }}
            </v-chip>
          </v-col>
          <v-col class="pb-1">
            <div class="">Date début</div>
            <v-chip color="">
              {{ formatDate(task.startAt) }}
            </v-chip>
          </v-col>
          <v-col class="pb-1">
            <div class="">Date fin</div>
            <v-chip color="">
              {{ formatDate(task.endAt) }}
            </v-chip>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="d-flex justify-end pa-3 mx-2"> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  watch: {},
  computed: {
    isDialogOpen() {
      return this.$store.getters['dialog/isDetailTaskDialogOpen']
    }
  },
  methods: {
    ...mapActions('dialog', ['closeDetailTaskDialog']),
    deleteTask() {
      this.$store.dispatch('dialog/closeDetailTaskDialog')
    },
    formatDate(dateString) {
      if (!dateString) {
        return ''
      }

      const date = new Date(dateString)
      const formattedDate = date.toISOString().slice(0, 16)

      return formattedDate
    }
  }
}
</script>

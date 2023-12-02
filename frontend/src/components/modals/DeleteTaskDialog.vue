<template>
  <v-dialog
    max-width="400px"
    transition="dialog-top-transition"
    v-model="isDialogOpen"
    :props="task"
    :close-on-back="false"
  >
    <v-card>
      <v-card-title class="bg-red">Confimer la suppression</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-7">
        Voulez-vous vraiment supprimer la tâche {{ task.name }} ?
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-end pa-3 mx-2">
        <v-btn class="mr-3" @click="closeDeleteTaskDialog">Annuler</v-btn>
        <v-btn
          class="text-red"
          :loading="loading"
          :disabled="loading"
          @click="deleteTask(task.uuid)"
          >Confimer</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { useToast } from 'vue-toast-notification'
import TaskService from '../../services/task.service'
import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()

export default {
  data() {
    return {
      loading: false
    }
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  computed: {
    isDialogOpen() {
      return this.$store.getters['dialog/isDeleteTaskDialogOpen']
    }
  },
  methods: {
    ...mapActions('dialog', ['closeDeleteTaskDialog']),
    async deleteTask(taskId) {
      try {
        this.loading = true
        const response = await TaskService.deleteTask(taskId)
        if (response.status === 201) {
          this.loading = false
          this.$store.dispatch('dialog/closeDeleteTaskDialog')
          $toast.success('Tâche supprimée avec succès !')
          await this.$store.dispatch('task/getAllTask')
        }
      } catch (error) {
        this.loading = false
        console.log({ error })
        $toast.error("une erreur s'est produite")
      }
    }
  }
}
</script>

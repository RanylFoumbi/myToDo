<template>
  <v-dialog
    max-width="600px"
    transition="dialog-bottom-transition"
    v-model="isDialogOpen"
    :close-on-back="false"
  >
    <v-form ref="form">
      <v-card>
        <v-card-title class="card-header">Édition de tâche</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-5 pb-0">
          <v-text-field
            label="Titre"
            v-model="inTask.name"
            outlined
            color="indigo"
            :rules="[(v) => !!v || 'Renseignez ce champ svp']"
          ></v-text-field>
          <v-textarea
            label="Description"
            v-model="inTask.description"
            rows="3"
            outlined
            :rules="[(v) => !!v || 'Renseignez ce champ svp']"
            color="indigo"
          ></v-textarea>
          <v-row class="d-flex justify-space-between mx-1" flat>
            <v-select
              small
              v-model="inTask.state"
              label="État"
              outlined
              color="indigo"
              :rules="[(v) => !!v || 'Sélectionnez un statut']"
              :items="['TODO', 'DOING', 'DONE', 'BLOCKED']"
            ></v-select>
            <v-spacer></v-spacer>
            <v-select
              v-model="inTask.priority"
              label="Niveau de priorité"
              outlined
              small
              color="indigo"
              :rules="[(v) => !!v || 'Sélectionnez un niveau de priorité']"
              :items="['LOW', 'MEDIUM', 'HIGH']"
            ></v-select>
          </v-row>
          <v-row class="d-flex justify-space-between mx-1">
            <v-text-field
              v-model="inTask.startAt"
              label="Date de début"
              flat
              type="datetime-local"
              :rules="[(v) => !!v || 'Sélectionnez une date']"
              color="indigo"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="inTask.endAt"
              label="Date de fin"
              type="datetime-local"
              outlined
              :rules="[(v) => !!v || 'Sélectionnez une date']"
              color="indigo"
            ></v-text-field>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end pa-3 mx-2">
          <v-btn class="mr-3" @click="closeEditTaskDialog">Cancel</v-btn>
          <v-btn
            variant="tonal"
            color="#433e90"
            :loading="loading"
            class="white--text"
            :disabled="isFormInvalid"
            @click="updateTask"
            >Mettre à jour</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { formatDate } from '../common'
import { useToast } from 'vue-toast-notification'
import TaskService from '../../services/task.service'
import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()

export default {
  data() {
    return {
      inTask: {
        name: '',
        state: '',
        endAt: null,
        priority: '',
        startAt: null,
        description: ''
      },
      loading: false,
      originalTask: null
    }
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  watch: {
    task: {
      handler(newTask) {
        this.inTask.name = newTask.name
        this.inTask.state = newTask.state
        this.inTask.priority = newTask.priority
        this.inTask.description = newTask.description
        this.inTask.endAt = formatDate(newTask.endAt)
        this.inTask.startAt = formatDate(newTask.startAt)
        this.originalTask = { ...newTask }
      },
      immediate: true
    }
  },
  computed: {
    isDialogOpen() {
      return this.$store.getters['dialog/isEditTaskDialogOpen']
    },
    isFormInvalid() {
      return !(
        this.inTask.name !== '' &&
        this.inTask.state !== '' &&
        this.inTask.endAt !== null &&
        this.inTask.priority !== '' &&
        this.inTask.startAt !== null &&
        this.inTask.description !== ''
      )
    }
  },
  methods: {
    ...mapActions('dialog', ['closeEditTaskDialog']),
    async updateTask() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true

          const updatedFields = {}

          for (const key in this.task) {
            if (this.inTask[key] !== this.originalTask[key]) {
              updatedFields[key] = this.inTask[key]
            }
          }

          const response = await TaskService.updateTask(this.originalTask.uuid, updatedFields)

          if (response.status === 201) {
            this.loading = false
            this.$store.dispatch('dialog/closeEditTaskDialog')
            await this.$store.dispatch('task/getAllTask')
            this.$refs.form.reset()
            $toast.success('Tâche mis à jour avec succès !')
          }
        } catch (error) {
          this.loading = false
          console.log({ error })
          $toast.error("une erreur s'est produite lors de la mis à jour de la tâche")
        }
      }
    }
  }
}
</script>

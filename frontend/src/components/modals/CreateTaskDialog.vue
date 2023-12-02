<template>
  <v-dialog
    max-width="650px"
    transition="dialog-top-transition"
    v-model="isDialogOpen"
    :close-on-back="false"
  >
    <v-form ref="form">
      <v-card>
        <v-card-title class="card-header">Création de tache</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-5 pb-0">
          <v-text-field
            label="Titre"
            v-model="task.name"
            outlined
            color="indigo"
            :rules="[(v) => !!v || 'Renseignez ce champ svp']"
          ></v-text-field>
          <v-textarea
            label="Description"
            v-model="task.description"
            rows="3"
            outlined
            :rules="[(v) => !!v || 'Renseignez ce champ svp']"
            color="indigo"
          ></v-textarea>
          <v-row class="d-flex justify-space-between mx-1" flat>
            <v-select
              small
              v-model="task.state"
              label="État"
              outlined
              color="indigo"
              :rules="[(v) => !!v || 'Sélectionnez un statut']"
              :items="['TODO', 'DOING', 'DONE', 'BLOCKED']"
            ></v-select>
            <v-spacer></v-spacer>
            <v-select
              v-model="task.priority"
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
              v-model="task.startAt"
              label="Date de début"
              flat
              type="datetime-local"
              :rules="[(v) => !!v || 'Sélectionnez une date']"
              color="indigo"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="task.endAt"
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
          <v-btn class="mr-3" text @click="closeCreateTaskDialog">Annuler</v-btn>
          <v-btn
            variant="tonal"
            color="#433e90"
            class="white--text"
            :disabled="isFormInvalid"
            @click="createTask"
            >Créer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
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
      loading: false,
      task: {
        name: '',
        state: '',
        endAt: null,
        priority: '',
        startAt: null,
        description: ''
      }
    }
  },
  computed: {
    isDialogOpen() {
      return this.$store.getters['dialog/isCreateTaskDialogOpen']
    },
    isFormInvalid() {
      return !(
        this.task.name !== '' &&
        this.task.state !== '' &&
        this.task.endAt !== null &&
        this.task.priority !== '' &&
        this.task.startAt !== null &&
        this.task.description !== ''
      )
    }
  },
  methods: {
    ...mapActions('dialog', ['closeCreateTaskDialog']),
    async createTask() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          const response = await TaskService.createTask(this.task)
          if (response.status === 201) {
            this.loading = false
            this.$store.dispatch('dialog/closeCreateTaskDialog')
            await this.$store.dispatch('task/getAllTask')
            this.$refs.form.reset()
            $toast.success('Tâche crée avec succès !')
          }
        } catch (error) {
          this.loading = false
          console.log({ error })
          $toast.error("une erreur s'est produite lors de la création de la tâche")
        }
      }
    }
  }
}
</script>
<style></style>

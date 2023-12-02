<template>
  <div>
    <CreateTaskDialog></CreateTaskDialog>
    <EditTaskDialog :task="currentTask"></EditTaskDialog>
    <DeleteTaskDialog :task="currentTask"></DeleteTaskDialog>
    <DetailTaskDialog :task="currentTask"></DetailTaskDialog>
    <v-container>
      <v-row class="ma-1 align-center d-flex">
        <v-col xs12 md6 class="d-flex justify-start">
          <h1 class="grey--text">Mes Tâches</h1>
        </v-col>
        <v-btn
          class="rounded-xs text-white mr-2"
          fab
          color="#ffa500"
          @click="openCreateTaskDialog"
          small
        >
          Nouvelle tâche
        </v-btn>
      </v-row>
      <v-card height="165" class="elevation-3 rounded pa-2 mb-3 ma-3" flat color="#FFFEFE">
        <v-card class="d-flex flex-row my-3" flat>
          <v-text-field
            v-model="search"
            clearable
            @click:clear="handleChange"
            @input="handleChange"
            background-color="#f4f4f4"
            class="rounded ml-3"
            dense
            hide-details
            single-line
            label="Rechercher"
            outlined
          >
            <template v-slot:append>
              <v-card flat @click="handleChange" class="pa-3 mr-2 rounded" color="#433e90">
                <v-icon color="white">mdi-magnify</v-icon>
              </v-card>
            </template>
          </v-text-field>
        </v-card>
        <v-col xs12 md6 class="d-flex justify-start">
          <v-menu
            transition="slide-y-transition"
            v-for="name in ['Filtrer par status', 'Filtrer par priorité']"
            :key="name"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                xs12
                v-bind="props"
                class="text-lowercase d-flex align-center mr-3"
                size="large"
                color="#A2B3A3"
              >
                {{ name }}
                <v-chip
                  v-if="name == 'Filtrer par status'"
                  color="#433e90"
                  class="pa-2 ma-2"
                  size=""
                  rounded="true"
                  ><b>{{ selectedState.length }}</b></v-chip
                >
                <v-chip
                  v-if="name == 'Filtrer par priorité'"
                  color="#433e90"
                  class="pa-2 ma-2"
                  size=""
                  rounded="true"
                  ><b>{{ selectedPriority.length }}</b></v-chip
                >
              </v-btn>
            </template>
            <v-list>
              <v-card
                v-if="name == 'Filtrer par status'"
                xs12
                max-height="200"
                width="230"
                class="overflow-auto"
                flat
              >
                <v-checkbox
                  class="ma-0"
                  color="#433e90"
                  :key="i"
                  @change="handleChange"
                  v-model="selectedState"
                  :value="state"
                  v-for="(state, i) in allState"
                  :label="state"
                ></v-checkbox>
              </v-card>
              <v-card
                v-if="name == 'Filtrer par priorité'"
                xs12
                max-height="200"
                width="230"
                class="overflow-auto"
                flat
              >
                <v-checkbox
                  class="ma-0"
                  color="#433e90"
                  v-model="selectedPriority"
                  @change="handleChange"
                  :key="i"
                  :value="priority"
                  v-for="(priority, i) in allPriority"
                  :label="priority"
                ></v-checkbox>
              </v-card>
            </v-list>
          </v-menu>
        </v-col>
      </v-card>
    </v-container>

    <v-container>
      <v-card class="mx-4 mb-8 pa-2" color="#F8FAFBCD" min-height="500" max-height="600" flat>
        <v-card-title class="text-center my-2 text-h7">
          <v-chip color="#D5964F" class="px-3 py-1" size="" rounded="true"
            ><b>{{ tasks.length }}</b></v-chip
          >
          tâche(s) trouvées
        </v-card-title>
        <!-- Loading card -->
        <v-card
          v-if="isloading"
          class="mx-4 mb-8 pa-4 align-center d-flex justify-center"
          flat
          color="transparent"
          height="500"
        >
          <div class="text-center">
            <v-progress-circular
              :size="70"
              :width="5"
              color="#ffa500"
              indeterminate
              class="mb-7"
            ></v-progress-circular>
            <h2 class="text-h6 text-center font-italic text-orange">Chargement en cours...</h2>
          </div>
        </v-card>

        <!-- Task cards -->
        <v-sheet v-else-if="totalTasks > 0" color="transparent" class="overflow-auto" height="500">
          <v-card
            v-for="task in tasks"
            :key="task.id"
            :class="`task ${task.state} `"
            class="mx-4 mb-5 pa-4"
          >
            <v-row row wrap>
              <v-col class="pb-1">
                <div class="text-grey">Titre</div>
                <div class="text-body font-weight-bold">{{ task.name }}</div>
              </v-col>
              <v-col class="pb-1 text-center">
                <div class="text-grey">Responsable</div>
                <div class="text-body font-weight-bold">{{ task.userId.username }}</div>
              </v-col>
              <v-col class="pb-1 d-flex align-center justify-sm-end">
                <v-chip :class="`white--text ${task.state}`">{{ task.state }}</v-chip>
                <v-icon @click="openDetailDialog(task)" class="ml-5" size="32" color="#433e90"
                  >mdi mdi-eye-outline</v-icon
                >
                <v-icon @click="openEditDialog(task)" class="ml-5" size="32" color="warning"
                  >mdi mdi-pencil</v-icon
                >
                <v-icon @click="openDeleteDialog(task)" class="ml-2" size="32" color="red"
                  >mdi mdi-delete</v-icon
                >
              </v-col>
            </v-row>
          </v-card>
        </v-sheet>
        <!-- No matching tasks message -->
        <v-card
          v-else
          class="mx-4 mb-8 pa-4 text-center align-center d-flex justify-center"
          flat
          color="transparent"
          height="500"
        >
          <div>
            <v-icon color="#D5964F" size="60">mdi-information-outline</v-icon>
            <h2 class="text-h6 text-center font-italic mt-5">
              Désolé aucune tâche ne correspond à votre recherche!
            </h2>
          </div>
        </v-card>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import EditTaskDialog from '../components/modals/EditTaskDialog.vue'
import CreateTaskDialog from '../components/modals/CreateTaskDialog.vue'
import DeleteTaskDialog from '../components/modals/DeleteTaskDialog.vue'
import DetailTaskDialog from '../components/modals/DetailTaskDialog.vue'

export default {
  components: {
    EditTaskDialog,
    CreateTaskDialog,
    DeleteTaskDialog,
    DetailTaskDialog
  },
  data() {
    return {
      search: '',
      currentTask: {},
      selectedState: [],
      selectedPriority: [],
      allPriority: ['LOW', 'MEDIUM', 'HIGH'],
      allState: ['TODO', 'DOING', 'DONE', 'BLOCKED']
    }
  },
  async mounted() {
    await this.$store.dispatch('task/getAllTask')
  },
  computed: {
    isloading() {
      return this.$store.getters['task/isLoadingTask']
    },
    tasks() {
      return this.$store.getters['task/allTasks']
    },
    totalTasks() {
      return this.tasks.length
    }
  },
  methods: {
    ...mapActions('task', ['getAllTasks', 'filterTasks']),
    ...mapActions('dialog', ['openCreateTaskDialog']),
    openDetailDialog(task) {
      this.currentTask = task
      this.$store.dispatch('dialog/openDetailTaskDialog')
    },
    openDeleteDialog(task) {
      this.currentTask = task
      this.$store.dispatch('dialog/openDeleteTaskDialog')
    },
    openEditDialog(task) {
      this.currentTask = task
      this.$store.dispatch('dialog/openEditTaskDialog')
    },
    async handleChange() {
      const filters = {
        search: this.search,
        state: this.selectedState,
        priority: this.selectedPriority
      }
      const filteredFilters = {}
      for (const key in filters) {
        if (
          filters[key] !== null &&
          filters[key] !== '' &&
          !(Array.isArray(filters[key]) && filters[key].length === 0)
        ) {
          filteredFilters[key] = filters[key]
        }
      }

      if (Object.keys(filteredFilters).length > 0) {
        this.filterTasks(filteredFilters)
      } else {
        await this.$store.dispatch('task/getAllTask')
      }
    }
  }
}
</script>

<style>
.task.TODO {
  border-left: 4px solid rgb(219, 239, 237);
}

.task.DONE {
  border-left: 4px solid turquoise;
}

.task.DOING {
  border-left: 4px solid orange;
}

.task.BLOCKED {
  border-left: 4px solid tomato;
}

.v-chip.TODO {
  background: rgb(219, 239, 237) !important;
}

.v-chip.DOING {
  background: orange !important;
}

.v-chip.DONE {
  background: rgb(26, 165, 26) !important;
}
.v-chip.BLOCKED {
  background: tomato !important;
}
.card-header {
  background-color: #433e90;
  color: white;
}
</style>

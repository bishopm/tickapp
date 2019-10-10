<template>
  <div class="layout-padding">
    <div class="text-center text-h6 q-my-md">Tasks</div>
    <showtask v-for="(task, index) in tasks" :class="{striped: index % 2 === 1}" :key="task.id" :task="task" @task_added="refreshTasks"/>
    <p class="text-center" v-if="!tasks">All current tasks are done!</p>
    <q-page-sticky expand position="top-right" :offset="[32, 32]">
      <q-btn round color="secondary" @click="addTask" class="fixed" icon="add"/>
    </q-page-sticky>
    <q-dialog minimized v-model="modal" position="bottom" :content-css="{padding: '20px'}">
      <q-card>
        <q-card-section>
          <p class="text-center caption q-mb-md">Add a new task</p>
        </q-card-section>
        <q-card-section>
          <taskform @task_added="refreshTasks" :task="newt" :userOptions="userOptions" :users="users" action="add" :projectOptions="projectOptions" :project_id="0"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
import showtask from './ShowTask'
import taskform from './TaskForm'
export default {
  data () {
    return {
      tasks: [],
      modal: false,
      users: [],
      newt: {},
      projectOptions: [],
      userOptions: []
    }
  },
  components: {
    'showtask': showtask,
    'taskform': taskform
  },
  mixins: [saveState],
  methods: {
    addTask () {
      this.modal = true
    },
    getSaveStateConfig () {
      return {
        'cacheKey': 'Tick_Tasks',
        'saveProperties': ['tasks']
      }
    },
    refreshTasks () {
      this.modal = false
      this.tasks = []
      this.$axios.get(process.env.API + '/mytasks/' + this.$store.state.user.id)
        .then(response => {
          for (var ppp in response.data.activeprojects) {
            for (var ttt in response.data.activeprojects[ppp].activetasks) {
              this.tasks.push(response.data.activeprojects[ppp].activetasks[ttt])
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    if (!localStorage.getItem('Tick_User')) {
      this.$router.push({ name: 'login' })
    } else {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('Tick_User')))
    }
    if (!localStorage.getItem('Tick_Deletes')) {
      localStorage.setItem('Tick_Deletes', true)
      this.$store.commit('setDeletes', true)
    } else {
      this.$store.commit('setDeletes', localStorage.getItem('Tick_Deletes'))
    }
    if (localStorage.getItem('Tick_Toolbar')) {
      this.$store.commit('setToolbar', localStorage.getItem('Tick_Toolbar'))
    }
    if (localStorage.getItem('Tick_Icon')) {
      this.$store.commit('setIcon', localStorage.getItem('Tick_Icon'))
    }
    this.newt.priority = new Date().toISOString().substr(0, 10)
    this.refreshTasks()
    this.$axios.get(process.env.API + '/myprojects/' + this.$store.state.user.id)
      .then(response => {
        for (var pkey in response.data.activeprojects) {
          var newitem = {
            label: response.data.activeprojects[pkey].project,
            value: response.data.activeprojects[pkey].id
          }
          this.projectOptions.push(newitem)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    this.userOptions.push({ label: this.$store.state.user.username, value: this.$store.state.user.id })
    for (var ukey in this.$store.state.user.team) {
      var newitem = {
        label: this.$store.state.user.team[ukey].username,
        value: this.$store.state.user.team[ukey].id
      }
      this.userOptions.push(newitem)
      this.users.push(this.$store.state.user.id)
    }
    this.$store.commit('setTeamUsers', this.userOptions)
  }
}
</script>

<style>
.layout-padding {
  padding-top:0;
}
h3 {
  line-height:0px;
}
.q-item.striped {
  background-color: #f0f7e7;
}
</style>

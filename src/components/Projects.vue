<template>
  <div class="layout-padding">
    <div class="text-center text-h6 q-mb-md">Current Projects</div>
    <q-list v-if="projects" no-border striped>
      <q-item v-for="project in projects" :key="project.id" :to="'/projects/' + project.id">
        <q-item-section class="text-center text-primary">
          {{project.project}}
        </q-item-section>
      </q-item>
    </q-list>
    <p class="text-center" v-if="!projects">No active projects at the moment</p>
    <q-btn round color="secondary" @click="addProject" class="fixed" icon="add" style="right: 18px; top: 60px" />
    <q-dialog v-model="modal" position="bottom" :content-css="{padding: '20px'}">
      <p class="text-center caption q-mb-md">Add a new project</p>
      <projectform :project="newp" :userOptions="userOptions" :users="users" @project_added="refreshProjects" action="add"/>
    </q-dialog>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
import projectform from './ProjectForm'
export default {
  data () {
    return {
      projects: [],
      modal: false,
      newp: {},
      userOptions: [],
      users: []
    }
  },
  components: {
    'projectform': projectform
  },
  mixins: [saveState],
  methods: {
    addProject () {
      this.modal = true
    },
    getSaveStateConfig () {
      return {
        'cacheKey': 'Tick_Projects',
        'saveProperties': ['projects']
      }
    },
    refreshProjects () {
      this.modal = false
      this.$axios.get(process.env.API + '/myprojects/' + this.$store.state.user.id)
        .then(response => {
          this.projects = response.data.activeprojects
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.refreshProjects()
    this.userOptions = this.$store.state.teamusers
    this.users.push(this.$store.state.user.id)
    this.newp.inactive = 'no'
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
.q-list-striped > .q-item:nth-child(even) {
  background-color: #f0f7e7;
}
</style>

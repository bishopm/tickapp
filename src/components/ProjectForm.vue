<template>
  <form>
    <div>
      <q-input label="Project name" v-model="project.project" outlined color="secondary"/>
    </div>
    <div class="q-mt-sm">
      <q-input v-model="project.description" label="Description" outlined color="secondary"/>
    </div>
    <div class="q-mt-sm">
      <q-select v-model="users" multiple outlined label="Who can see this project?" color="secondary" :options="userOptions" map-options emit-value/>
    </div>
    <div class="q-mt-sm">
      <q-select v-model="project.inactive" label="Project status" outlined :options="activeOptions" true-value="yes" false-value="no" color="secondary" map-options emit-value/>
    </div>
    <div class="text-center q-my-md">
      <q-btn v-if="action === 'edit'" class="q-mr-md" label="Delete" color="black"></q-btn>
      <q-btn v-else class="q-mr-md" @click="$emit('project_added')" color="black" label="Cancel" />
      <q-btn v-if="action === 'edit'" class="q-mr-md" @click="updateProject" label="Update" color="primary"></q-btn>
      <q-btn v-else color="primary" label="Add" @click="submitProject" />
    </div>
  </form>
</template>

<script>
export default {
  props: ['project', 'userOptions', 'action', 'users'],
  data () {
    return {
      activeOptions: [{ label: 'Active', value: 0 }, { label: 'Inactive', value: 1 }]
    }
  },
  created () {
    if (!this.users.length) {
      for (var uu in this.project.users) {
        this.users.push(this.project.users[uu].id)
      }
    }
  },
  methods: {
    submitProject () {
      this.$axios.post(process.env.API + '/projects',
        {
          project: this.project.project,
          description: this.project.description,
          users: this.users,
          inactive: 'no'
        })
        .then(response => {
          this.$q.notify({ message: 'Project has been added', position: 'top', color: 'secondary' })
          this.$emit('project_added')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    updateProject () {
      this.$axios.post(process.env.API + '/projects/' + this.$route.params.id,
        {
          project: this.project.project,
          description: this.project.description,
          users: this.users,
          inactive: this.project.inactive
        })
        .then(response => {
          this.$q.notify({ message: 'Project has been updated', position: 'top', color: 'secondary' })
          this.$emit('project_added')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>

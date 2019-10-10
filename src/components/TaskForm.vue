<template>
  <form class="q-mx-md">
    <div class="q-pt-md">
      <q-input v-model="task.task" value="task.task" label="Description" color="info"/>
    </div>
    <div class="q-mt-sm">
      <q-select v-model="users" multiple label="Assigned to" color="info" inverted :options="userOptions" map-options emit-value/>
    </div>
    <div class="q-mt-sm">
      <q-input v-model="task.priority" label="Active from">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="task.priority" mask="YYYY-MM-DD" @input="() => $refs.qDateProxy.hide()" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="q-mt-sm">
      <q-select v-model="task.project_id" label="Project" inverted color="info" :options="projectOptions" map-options emit-value/>
    </div>
    <div class="text-center q-my-md">
      <q-btn v-if="action === 'edit'" class="q-mr-md" @click="deleteTask" label="Delete" color="black"/>
      <q-btn v-else class="q-mr-md" color="black" @click="$emit('task_added')" label="Cancel" />
      <q-btn v-if="action === 'edit'" class="q-mr-md" @click="updateTask" label="Update" color="secondary"/>
      <q-btn v-else color="secondary" label="Add" @click="submitTask" />
    </div>
  </form>
</template>

<script>
export default {
  props: ['task', 'userOptions', 'action', 'projectOptions', 'project_id', 'users'],
  data () {
    return {
      project: null
    }
  },
  created () {
    if (!this.users.length) {
      for (var uu in this.task.users) {
        this.users.push(this.task.users[uu].id)
      }
    }
    this.project = this.project_id
  },
  methods: {
    submitTask () {
      this.$axios.post(process.env.API + '/tasks',
        {
          task: this.task.task,
          project_id: this.task.project_id,
          priority: this.task.priority,
          users: this.users
        })
        .then(response => {
          this.$q.notify({ message: 'Task has been added', position: 'bottom', color: 'primary' })
          this.task.task = ''
          this.task.priority = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
          this.$emit('task_added')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    updateTask () {
      this.$axios.post(process.env.API + '/tasks/' + this.$route.params.id,
        {
          task: this.task.task,
          project_id: this.task.project_id,
          priority: this.task.priority,
          users: this.users
        })
        .then(response => {
          this.$q.notify({ message: 'Task has been updated', position: 'top', color: 'secondary' })
          this.$emit('task_added')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteTask () {
      this.$axios.post(process.env.API + '/deletetask',
        {
          id: this.$route.params.id
        })
        .then(response => {
          this.$q.notify({ message: 'Task has been deleted', position: 'top', color: 'secondary' })
          this.$router.go(-1)
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

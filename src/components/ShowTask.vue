<template>
  <q-item>
    <q-item-section class="text-left">
      <router-link :to="'/tasks/' + task.id" class="text-primary" style="text-decoration:none">{{task.task}}</router-link>
    </q-item-section>
    <q-item-section side class="text-right">
      <q-checkbox @click.native="taskDone(task.id)" color="primary" v-model="task.done" true-value="yes" false-value="no" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['task'],
  data () {
    return { }
  },
  methods: {
    taskDone (id) {
      this.$axios.get(process.env.API + '/tasks/' + id + '/toggle')
        .then(response => {
          if (this.$store.state.deletes === 'true') {
            this.$axios.post(process.env.API + '/deletetask',
              {
                id: this.task.id
              })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.q-checkbox-icon {
  opacity: 1;
}
.q-item {
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>

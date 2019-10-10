<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar color="primary" :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          <router-link to="/" class="text-white" style="text-decoration:none;">Tick</router-link>
          <div slot="subtitle">tasks and projects</div>
        </q-toolbar-title>
        <q-btn flat dense round @click="rightDrawerOpen = !rightDrawerOpen" aria-label="Menu">
          <q-icon name="person" />
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer side="right" v-model="rightDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-item to="/settings">
          <q-item-section avatar>
            <q-icon color="primary" name="person_outline" />
          </q-item-section>
          <q-item-section side>
            <q-item-label overline>Settings</q-item-label>
            <q-item-label caption>user and app settings</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/someday">
          <q-item-section avatar>
            <q-icon color="primary" name="folder" />
          </q-item-section>
          <q-item-section side>
            <q-item-label overline>Some day</q-item-label>
            <q-item-label caption>inactive projects</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/unallocated">
          <q-item-section avatar>
            <q-icon color="primary" name="help_outline" />
          </q-item-section>
          <q-item-section side>
            <q-item-label overline>Unallocated</q-item-label>
            <q-item-label caption>tasks not assigned to a project</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <q-toolbar class="justify-around bg-black">
        <q-item class="text-center" to="/tasks">
          <q-item-section>
            <q-icon size="24px" name="check_box" color="white"/>
          </q-item-section>
        </q-item>
        <q-item class="text-center" to="/allprojects">
          <q-item-section>
            <q-icon size="24px" name="list" color="white"/>
          </q-item-section>
        </q-item>
        <q-item class="text-center" v-if="toolbar" to="/favourite">
          <q-item-section>
            <q-icon size="24px" :name="icon" color="white"/>
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      rightDrawerOpen: false
    }
  },
  computed: {
    toolbar () {
      if ((this.$store.state.toolbar) || (localStorage.getItem('Tick_Toolbar'))) {
        if (this.$store.state.toolbar) {
          return '/projects/' + this.$store.state.toolbar
        } else {
          return '/projects/' + localStorage.getItem('Tick_Toolbar')
        }
      } else {
        return false
      }
    },
    icon () {
      if ((this.$store.state.icon) || (localStorage.getItem('Tick_Icon'))) {
        if (this.$store.state.icon) {
          return this.$store.state.icon
        } else {
          return localStorage.getItem('Tick_Icon')
        }
      } else {
        return false
      }
    }
  }
}
</script>

<style>
div.col.text-center.bottomitem {
  display:block;
}
</style>

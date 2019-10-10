import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const store = new Vuex.Store({
    mutations: {
      setUser (state, newuser) {
        state.user = newuser
      },
      setIcon (state, newicon) {
        state.icon = newicon
      },
      setTeamUsers (state, newteamusers) {
        state.teamusers = newteamusers
      },
      setToolbar (state, newtoolbar) {
        state.toolbar = newtoolbar
      },
      setDeletes (state, newdeletes) {
        state.deletes = newdeletes
      }
    }
  })
  return store
}

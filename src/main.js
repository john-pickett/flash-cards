// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  VRadioGroup,
  VDialog,
  VTooltip,
  VCheckbox,
  VMenu,
  VTextField,
  VParallax,
  VProgressCircular,
  VSelect,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VRadioGroup,
    VDialog,
    VTooltip,
    VCheckbox,
    VMenu,
    VTextField,
    VParallax,
    VProgressCircular,
    VSelect,
    transitions
  }
})

export const eventBus = new Vue();
// eventBus methods
// -- flash cards --
// scoreReset
// answerPicked
// startTimer
// stopTimer
// timeUp
// openConfirm
// openScoreModal
// openLessonModal
// openTimeModal

// -- hang man --


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {}
const requireModule = require.context('.', true, /\.js$/)

requireModule.keys().forEach(filename => {
  if (filename === './index.js') {
    return
  }

  if (filename.endsWith('mutation-types.js')) {
    return
  }

  const moduleName = filename.replace(/(^\.\/|(\/index)?\.js)/g, '')
  modules[moduleName] = {
    namespaced: true,
    ...requireModule(filename)
  }
})

export default new Vuex.Store({
  modules
  // strict: process.env.NODE_ENV !== 'production'
})

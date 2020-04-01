/*
 * @Author: niansnana
 * @Begin: 2020-03-30 20:27:58
 * @Update: 
 * @Update log: 添加store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.state({
    state,
    mutations,
    getters,
    actions
})
import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicInfo from '../components/BasicInfo.vue'
import PeopleAnl from '../components/PeopleAnl.vue'
import PowerData from '../components/PowerData.vue'
import FireSafe from '../components/FireSafe.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: BasicInfo },
  { path: '/PeopleAnl', component: PeopleAnl },
  { path: '/PowerData', component: PowerData },
  { path: '/FireSafe', component: FireSafe },
]

const router = new VueRouter({
  routes,
})

export default router
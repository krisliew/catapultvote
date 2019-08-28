import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/components/home'
import Modules from '@/components/modules'
import EntryForm from '@/components/EntryForm'
import Dashboard from '@/components/userComponents/dashboard'
import CreatePoll from '@/components/userComponents/createpoll'
import Result from '@/components/userComponents/result'
import PollCreated from '@/components/userComponents/pollcreated'
import PollVoted from '@/components/userComponents/pollvoted'
import PollWatchList from '@/components/userComponents/pollwatchlist'

export default new Router({
  mode:'history',
  hash:false,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/modules',
      name:'Modules',
      component: Modules
    },
    {
      path:'/entry',
      name:'Entry',
      component: EntryForm
    },
    {
      path:'/dashboard',
      name:'Dashboard',
      component: Dashboard
    },
    {
      path:'/createpoll',
      name:'CreatePoll',
      component:CreatePoll
    },
    {
      path:'/result',
      name:'Result',
      component:Result
    },
    {
      path:'/pollcreated',
      name:'pollcreated',
      component:PollCreated
    },
    {
      path:'/pollvoted',
      name:'pollvoted',
      component:PollVoted
    },
    {
      path:'/pollwatchlist',
      name:'pollwatchlist',
      component:PollWatchList
    }
  ]
})
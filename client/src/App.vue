<template>
  <div id="app">
    <router-view />
    <Footer />
    <Rocket />
  </div>
</template>

<script>
require("jquery")
require("jquery.easing")
require("bootstrap")

import jwtDecode from 'jwt-decode'
import Navigation from './components/navigationbar'
import Footer from './components/footer'
import Rocket from './components/utility/rocket'
import EventBus from './components/EventBus'
import router from './router'

export default {
  name: 'app',
  components: {
    'Navigation': Navigation,
    'Footer':Footer,
    'Rocket':Rocket
  },
  data(){
      return {
        ID: ''
      }
  },
  methods:{
    logout (){
      localStorage.removeItem('usertoken')
      this.ID = ''
    }
  },
  mounted(){
    console.log(localStorage)
    if(localStorage.usertoken && !this.ID){
      console.log("running at App.Vue!")
      var token = jwtDecode(localStorage.usertoken)
      this.ID = token.ID
      console.log("App.vue => You are logged in as " + token.ID)
    }
  }
}
</script>

<style>
section{
    padding-bottom:50px;    
}
section h2{
    text-align:center;
    padding-top:50px;
    padding-bottom:15px;
    margin-bottom:15px;
}
/* 
vue init webpack [CatapultVote]

npm run dev [localhost:8080]

npm install vue-router vue-resource --save
 */
</style>

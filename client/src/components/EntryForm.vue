<template>
  <section id="" >
    <div id="background">
      <div id="normalNav">
        <a class="navbar-brand" href="/"><img src="../assets/img/logo.jpg" height="45px"/></a>
      </div>
    </div>
    <div id="loginContainer">
      <div id="loginForm">
        <LoginComp v-show="display==true" />
        <RegisterComp v-show="display==false" />
      </div>
    </div>
  </section>
</template>

<script>
    // To-add:
    // 1) Keep me logged in
    // 2)Forgot Password

import axios from 'axios'
import router from '../router'
import Register from './register'
import Login from './login'

  export default {
    name: 'EntryForm',
    components: {
      "LoginComp":Login,
      "RegisterComp":Register
    },
    data() {
      return {
          display:true,
          username:"",
          password:"",
          usernameErr:"",
          passwordErr: ""
      }
    },
    mounted(){
      if(localStorage.usertoken){
        router.push({name: 'Home' })
      }
    },
    methods:{
      switch(){
        if(this.display == true){
          this.display = false
        }else{
          this.display = true
        }
      }
    }
  }
</script>

<style scoped>
section{
  height:120vh;
  font-family: 'Open Sans',sans-serif;
}
#background{
  display:inline-block;
  background-image:url(../assets/img/securitylock.jpg);
  background-size: cover;
  background-repeat:no-repeat;
  height:120vh;
  width: 480px; /*so 960px reso fit 50-50 with login form */  
  left: 0;
}
#loginContainer{
  width: -webkit-calc(100% - 480px);
  width: -moz-calc(100% - 480px);
  width: calc(100% - 480px);
  float: right;
  height: 100vh;
}
#loginForm{
  margin: 0 auto;
  width:480px;  
  padding-top: 100px;
}
#normalNav{
  margin: 40px 0 0 50px;
}
#normalNav a{
  height:160px;
  width:50px;
  display:block;
}

@media (max-width: 959px){
  #background{
    display:none;
  }
  #loginForm{
    padding-top:50px;
  }
  #loginContainer{
    width:100%;
  }
}

@media (max-width: 479px){
  #background{
    display:none;
  }
  #loginForm{
    padding-top:50px;
    width:320px;
  }
  #loginContainer{
    width:100%;
  }
}
</style>
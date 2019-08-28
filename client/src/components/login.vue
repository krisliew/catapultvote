<template>
  <div id="formParent1">
    <div id="mobileNav">
      <a id="mobileLogo" class="navbar-brand" href="/"><img src="../assets/img/logoblue.jpg" height="40px"/></a>
      <p id="createAccount">
        Don't have an account? 
        <a  v-on:click="this.$parent.switch">Sign Up</a>              
      </p>
    </div>
    <form v-on:submit.prevent="login">
      <h1>Login</h1>
      <div class="form-group">
        <label for="inputUsername" class="labelField">Username / Email</label>
        <input type="text" name="username" v-on:change="nameCheck" v-model="username" class="form-control" autofocus>
        <p class="text-error"> {{ usernameErr}} </p>
      </div>

      <div class="form-group">
        <label for="inputPassword" class="labelField">Password</label>
        <input type="password" name="password" v-on:change="passwordCheck" v-model="password" class="form-control">
        <p class="text-error"> {{ passwordErr }}</p>
      </div>
          
      <div class="form-group" id="cbLogin">
        <label class="custom-control custom-checkbox">
              <input type="checkbox" id="checkbox" class="custom-control-input">
              <span class="custom-control-label">Keep me logged in</span>
        </label>
      </div>

      <div class="form-group" id="forgotPW">
          <a href="" target="_self">Forgot your password?</a>
      </div>

      <div class="form-group ">
          <button type="submit" id="loginBtn" class="btn">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
    // To-add:
    // 1) Keep me logged in
    // 2)Forgot Password

import axios from 'axios'
import router from '../router'

  export default {
    name: 'Login',
    components: {
    },
    data() {
      return {
          username:"",
          password:"",
          usernameErr:"",
          passwordErr: ""
      }
    },
    methods:{
      nameCheck(){
        if(this.username.length < 1){
          this.usernameErr = "Username / Email cannot be empty!"
          return false
        }else{
          this.usernameErr = ""
          return true
        }
      },
      passwordCheck(){
        if(this.password < 1){
          this.passwordErr = "Password cannot be empty!"
          return false
        }else{
          this.passwordErr = ""
          return true
        }
      },
      login(){
        if(this.nameCheck() * this.passwordCheck()){
            axios.post('/users/login',
            {
              ID: this.username,
              password: this.password
            }).then(res => {
              if(res.status == 200 && !res.data.Error){
                localStorage.setItem('usertoken',res.data)
                this.username = ''
                this.password = ''
                router.push({name: 'Dashboard' })
              }else if(res.status == 200 && res.data.Error > 0){
                this.passwordErr = "The username or password you've entered is incorrect."
              }
            }).catch(err => {
              console.log(err)
              this.passwordErr = "Connection Error: Please try again later or contact support!'"
            })
          }
        }
      }
  }
</script>

<style scoped>
#createAccount{
  position: absolute;
  right: 50px;
  top: 40px;
  font-size: 16px;
  color: #4c4c4c;
}
#createAccount a{
    border: 1px solid #0372f2;
    color: #0372f2;
    border-radius: 3px;
    text-transform: uppercase;
    margin-left: 24px;
    display: inline-block;
    height: 48px;
    padding: 0 35px;
    text-align: center;
    line-height: 46px;
    text-decoration: none;
    cursor:pointer;
}
#mobileLogo{
  display:none;
}
#formParent1{
  width:420px;
  margin: 0 auto;
}
#formParent1 h1{
  font-size: 36px;
  font-weight: normal;
  line-height: 2.22;
  color: #4c4c4c
}
#formParent1 form{  
  width:420px;
  margin: 0 auto;  
}
#formParent1 form div{
  margin-left:0;
  margin-right:0;
}
/* Username + password input */
.labelField{ 
  text-transform: uppercase;
  color: #aaa;    
  max-width: 100%;
}
#formParent1 input[type=text], #formParent1 input[type=password]{
  border-radius: 3px;
  height: 48px;
}
/* Error msg text */
.text-error{
  padding-top: 5px;
  color: #fa4848;
  margin: 0 0 7px 0;
  font-size: 12px;
  max-width: 100%;
}
/* Fix login checkbox position */
#cbLogin span{
  padding-top:3px;
}
/* Forgot Password <a> */
#forgotPW a{
  color: #0564d1;
  font-size: 16px;
}
/* Login Button */
#loginBtn{
  width: 100%;
  border-radius: 3px;
  background-color: rgba(0,0,41,0.9);
  font-size: 16px;
  text-transform: uppercase;
  color: #fff;
  padding: 11px 36px;
}

@media (max-width: 959px){
  #background{
    display:none;
  }
  #loginForm{
    padding-top:100px;
  }
  #loginContainer{
    width:100%;
  }
  #mobileNav{
    width:420px;
    display:inline-block;
  }
  #mobileNav p{
    float:right;
    position:inherit;
    visibility:collapse;
  }
  #mobileNav p a{
    visibility:visible;
  }
  #mobileLogo{
    width:15%;
    display:inline-block;
    margin:0;
    padding:0;
  }
}
@media (max-width: 479px){
  #background{
    display:none;
  }
  #loginForm{
    padding-top:100px;
  }
  #loginContainer{
    width:100%;
  }
  #mobileNav{
    width:320px;
    display:inline-block;
  }
  #mobileNav p{    
    float:right;
    position:inherit;
    visibility:collapse;
  }
  #mobileNav p a{
    width:100%; /* Marked */
    visibility:visible;
  }
  #mobileLogo{
    width:15%;
  }
  #mobileLogo img{
    width:130px;
  }
  #formParent1,#formParent1 form{
    width:320px;
  }
  #createAccount{
    margin-top:-50px;
    width:44%;
  }
  #createAccount a{
    margin-left:-15px;
  }
}
</style>
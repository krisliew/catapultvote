<template>
  <div id="formParent2">
    <div id="mobileNav">
      <a id="mobileLogo" class="navbar-brand" href="/"><img src="../assets/img/logoblue.jpg" height="40px"/></a>
      <p id="createAccount">
        Have an account already? 
        <a v-on:click="this.$parent.switch">Sign In</a>
      </p>
    </div>
    <form v-on:submit.prevent="register">
      <h1>Sign Up</h1>
      <div class="form-group">
          <label for="" class="labelField">Username</label>
          <input type="text" v-on:keyup="usernameCheck" v-model="username" class="form-control" >
          <p class="text-error"> {{ usernameErr}} </p>
      </div>
      <div class="form-group">
          <label for="" class="labelField">Email</label>
          <input type="email" v-on:keyup="emailCheck" v-model="email" class="form-control">
          <p class="text-error"> {{ emailErr}} </p>
      </div>
      <div class="form-group">
        <label for="" class="labelField">Password</label>
          <input type="password" v-on:keyup="passwordCheck" v-model="password" class="form-control">
          <p class="text-error"> {{ passwordErr}} </p>
      </div>
      <div class="form-group">
        <label for="" class="labelField">Confirm Password</label>
          <input type="password" v-on:keyup="passwordCheck" v-model="password2" class="form-control">
          <p class="text-error"> {{ password2Err}} </p>
      </div>
      <div class="form-group">
          <label for="" class="labelField">Public Address</label>
          <input maxlength="40" type="text" v-on:keyup="publicAddressCheck" v-model="publicAddress" class="form-control">
          <p class="text-error"> {{ publicAddressErr }} </p>
      </div>
      <div class="form-group">
          <button type="submit" id="registerBtn" class="btn">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'Register',
    data() {
      return {
          reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
          username:"",
          email:"",
          password:"",
          password2:"",
          publicAddress:"",

          usernameErr:"",
          emailErr:"",
          passwordErr:"",
          password2Err:"",
          publicAddressErr:""
      }
    },
    methods:{
      usernameCheck(){
        this.username = this.username.toLowerCase().trim()
        if(this.username.length < 1){
          this.usernameErr = "Username cannot be empty!"
          return false
        }else if(this.username.length >10){
          this.usernameErr = "Username cannot be longer than 10 character!"
          return false
        }else{
          this.usernameErr = ""
          return true
        }
      },
      emailCheck(){
        this.email = this.email.toLowerCase()
        if(this.email.length < 1){
          this.emailErr = "Email cannot be empty!"          
          return false
        }else if (!this.reg.test(this.email)){
          this.emailErr = "Email must be in correct format!"
          return false
        }else{
          this.emailErr = ""
          return true
        }
      },
      passwordCheck(){
        if(this.password.length < 1){
          this.passwordErr = "Password cannot be empty!"
          return false
        }else if(this.password.length < 8){
          this.passwordErr = "Password must be longer than 8 character(s)!"
          return false
        }else if(this.password !== this.password2){
          this.passwordErr = ""
          this.password2Err = "Both password you entered do not match!"
        }else{
          this.passwordErr = ""
          this.password2Err = ""
          return true
        }
      },
      publicAddressCheck(){
        this.publicAddress = this.publicAddress.toUpperCase()
        if(this.publicAddress.length < 1){
          this.publicAddressErr = "Public Address cannot be empty!"
          return false
        }else{
          this.publicAddressErr = ""
          return true
        }
      },
      register(){        
        if(this.usernameCheck() * this.emailCheck() * this.passwordCheck() * this.publicAddressCheck() == true){
          axios.post('/users/register',
            {
              ID:this.username,
              email:this.email,
              password:this.password,
              publicAddress:this.publicAddress
            }).then(res => {
              if(res.data.Error == 3){
                this.usernameErr = "This username has been taken. Please try another."
                this.emailErr = "The email has already been used."
              }else if(res.data.Error == 2){
                this.emailErr = "The email has already been used."
              }else if(res.data.Error == 1){
                this.usernameErr = "This username has been taken. Please try another."
              }else if(res.data.Pass == 1){
                this.username = ''
                this.email = ''
                this.password = ''
                this.password2 = ''
                this.publicAddress = ''
                this.$parent.switch()
              }
            }).catch(err => {
              console.log(err)
              this.publicAddressErr = "Connection Error: Please try again later or contact support!'"
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
#formParent2{
  width:420px;
  margin: 0 auto;
}
#formParent2 h1{
  font-size: 36px;
  font-weight: normal;
  line-height: 2.22;
  color: #4c4c4c
}
#formParent2 form{  
  width:420px;
  margin: 0 auto;  
}
#formParent2 form div{
  margin-left:0;
  margin-right:0;
}
/* Username + password input */
.labelField{ 
  text-transform: uppercase;
  color: #aaa;    
  max-width: 100%;
}
#formParent2 input[type=text], #formParent2 input[type=password],#formParent2 input[type=email]{
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
/* Login,Register Button */
#loginBtn,#registerBtn{
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
  #formParent2,#formParent2 form{
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

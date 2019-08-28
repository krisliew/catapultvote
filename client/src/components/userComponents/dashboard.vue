<template>
  <div>
    <Navigation />
    <section id="dashboard" >
      <header class="bg-primary text-white">
        <div class="container text-center">
          <h1>Dashboard</h1>
          <p class="lead"><b>User ID: {{ this.$parent.ID }}</b></p>
          <p class="lead"><b>Email: {{ email }}</b></p>
          <p class="lead"><b>Public Address: {{ publicAddress }}</b></p>
          <input type="text" v-model="publicAddress_up" maxlength="40"/> 
          <button type="submit" @click="updatePublicAddress">Update Address</button>
          <p class="text-error"> {{ publicAddressErr }} </p>
          <p class="lead"><b>Poll Created: </b></p>
          <p class="lead"><b>Poll Bookmarked: </b></p>
        </div>
      </header>
        <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <h2>What is Catapult Vote?</h2>
            <p class="lead">Catapult Vote is a new generation voting system created by a blockchain enthusiast student. The purpose of this system is to provide a simple, secured and transparent voting platform globally. The blockchain of this voting system is powered  by <a target="_blank" rel="noreferrer" href="https://nem.io/catapult/">NEM 2 Catapult Blockchain</a>.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import Navigation from '../navigationbar'
import jwtDecode from 'jwt-decode'

  export default {
    name: 'Dashboard',
    components: {
      'Navigation':Navigation
    },
    data() {
      return{
        email: '',
        publicAddress:'',
        publicAddressErr:'',
        publicAddress_up:'',
        Navigation: true,
        dashboardhref: "#dashboard"
      }
    },
    methods:{
      //TO DO:
      returnToken(){
        var inputAddress = 'SATJML36XZQWZUO7XV23OCP2XEA3RI65F7UAQVOR'

        const nem2Sdk = require("nem2-sdk")
        const AccountHttp = nem2Sdk.AccountHttp;
        const Address = nem2Sdk.Address;

        /* start block 01 */
        const accountHttp = new AccountHttp('http://localhost:3000/');
        const address = Address.createFromRawAddress(inputAddress);

        accountHttp
            .getAccountInfo(address)
            .subscribe(accountInfo => console.log(accountInfo), err => console.error(err));
      }
    },
    mounted(){
      if(!localStorage.usertoken){
        router.push({name: 'Entry' })
      }else if(localStorage.usertoken){
        console.log("dashboard.vue => Running at Dashboard.vue!")
        var token = jwtDecode(localStorage.usertoken)
        this.$parent.ID = token.ID

        axios.post('/users/dashboard',
        {
          ID: this.$parent.ID
        }).then(res => {
          localStorage.setItem('dashboardToken',res.data)
          var dashboardToken = jwtDecode(localStorage.dashboardToken)
          this.email = dashboardToken.email
          this.publicAddress = dashboardToken.publicAddress
          localStorage.removeItem('dashboardToken')
        }).catch(err => {
          console.log(err)
        })
      }
        //cant use this comment-ed code below because of vue stuff exist on it
        // var theAnchor = document.getElementById('dashboardNav')
        // theAnchor.href = "#dashboard"
    },
    methods:{
      updatePublicAddress(){
        if(this.publicAddress_up.length == 40){
          this.publicAddressErr = ''
          axios.post('/users/updatePublicAddress',
          {
            ID : this.$parent.ID,
            publicAddress: this.publicAddress_up
          }).then(res => {
            if(res.status == 200){
              console.log(res.data)
              this.publicAddress = this.publicAddress_up.toUpperCase()
              this.publicAddress_up = ''
            }else{
              console.log("Error update")              
            }
          }).catch(err => {
            this.publicAddressErr = "Error updating Public Address, please contact support!"
            console.log(err)
          })
        }else{
          this.publicAddressErr = "Public Address must be 40 characters"
        }
      }
    }
  }
</script>

<style scoped>
/* Error msg text */
.text-error{
  padding-top: 5px;
  color: #fa4848;
  margin: 0 0 7px 0;
  font-size: 12px;
  max-width: 100%;
}

header{
    padding: 156px 0 100px;
    height: 100vh;
    background-image: url(../../assets/img/index/header.jpg);
    background-size: cover;
    background-repeat:no-repeat;
}
</style>    
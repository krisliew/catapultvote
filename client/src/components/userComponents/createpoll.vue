<template>
  <div>
    <Navigation />
    <section id="">      
      <header class="bg-primary text-white" >
        <div class="container text-center">
          <h1>Create Poll</h1>
          <p class="lead"><a href="/modules"> Modules </a> > <a> Create Poll </a></p>
        </div>
      </header>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
              <form v-on:submit.prevent="announcePoll">
                <!-- Poll Configuratin -->
                <div v-show="displayFinal==false">
                  <h2>Poll Config</h2>
                      <p> 
                        Poll Type: 
                        <button type="button" v-on:click="pollSwap" v-show="pollType==0" id="publicBtn">Public Poll</button>
                        <button type="button" v-on:click="pollSwap" v-show="pollType==1" id="privateBtn">Private Poll</button>
                      </p>
                  <div class="form-group">
                      <label for="" class="labelField">Number of Candidate:</label>
                      <input type="number" v-on:change="candidateNumberCheck" v-model="candidateNumber" class="form-control" >
                      <p class="text-error"> {{ candidateNumberErr }} </p>
                  </div>
                  <div class="form-group" v-show="pollType==1">
                      <label for="" class="labelField">Number of Whitelist Address:</label>
                      <input type="number" v-on:change="whitelistNumberCheck" v-model="whitelistNumber" class="form-control" >
                      <p class="text-error"> {{ whitelistNumberErr }} </p>
                  </div>
                  <!-- Poll Information -->
                  <h2 v-if="pollType==0">Public Poll</h2>
                  <h2 v-else>Private Poll</h2>
                  <div class="form-group">
                        <label for="" class="labelField">Poll Title</label>
                        <input type="text" v-on:keyup="pollTitleCheck" v-model="pollTitle" class="form-control" >
                        <p class="text-error"> {{ pollTitleErr }} </p>
                    </div> 
                  <div class="form-group">
                      <label for="" class="labelField">Poll Description</label>
                      <input type="text" v-on:keyup="pollDescCheck" v-model="pollDesc" class="form-control" >
                      <p class="text-error"> {{ pollDescErr }} </p>
                  </div>
                  <div class="form-group">
                      <label for="" class="labelField">Close Poll at: </label>
                      <input type="datetime-local" v-on:change="dateEndCheck" v-model="dateEnd" :min="minDate" class="form-control" >
                      <p class="text-error"> {{ dateEndErr }} </p>
                  </div>
                  <!-- Poll Candidates (Option to vote on) -->
                  <h2>Poll Candidates</h2>
                  <div class="form-group" v-for="(candidates,index) in candidate">
                      <label for="" class="labelField">Candidate {{index+1}}: </label>
                      <input type="text" v-model="candidate[index]" class="form-control" maxlength="40">
                      <p class="text-error"> {{  }} </p>
                  </div>
                  <!-- Poll Whitelister (Enable the address below to Vote) -->
                  <h2 v-show="pollType==true">Poll Whitelister</h2>
                  <div v-show="pollType==true" class="form-group" v-for="(whitelists,index2) in whitelist">
                      <label for="" class="labelField">Whitelist Address {{index2+1}}: </label>
                      <input type="text" v-model="whitelist[index2]" class="form-control" minlength="40" maxlength="40">
                      <p class="text-error"> {{  }} </p>
                  </div>
                  <!-- Poll Confirmation: Input private key to announce this poll to Blockchain -->
                  <h2>Poll Confirmation</h2>             
                  <div class="form-group">
                      <label for="" class="labelField">Private Key:</label>
                      <button type="button" @click="toggleCameraDiv">Toggle Camera</button>
                      <input type="password" v-on:change="privateKeyCheck" v-model="privateKey" maxlength="64" class="form-control decode-result" >
                      <p class="text-error"> {{ privateKeyErr }} </p>

                      <div v-show="displayCamera == true"> 
                        <qrcode-drop-zone @decode="onDecode" @init="logErrors">
                          <qrcode-stream @decode="onDecode" @init="onInit" />
                        </qrcode-drop-zone>
                      </div>
                      <qrcode-capture @decode="onDecode" />
                  </div>
                  <div class="form-group" id="divRegisterBtn">
                      <button type="submit" id="registerBtn" class="btn">Create Poll</button>
                      <p class="text-error"> {{ formInfoErr }} </p>
                  </div>
                </div>
                <!-- <div v-show="displayFinal==true"> -->
                <div v-show="displayFinal==true" class="align-content-center">
                  <h2>Poll Information</h2>
                  <div class="form-group align-content-center  text-center">
                      <qr-code :text="pollPublicKey" class="centerIt"></qr-code><br/>

                      <div class="progress" style="height:25px;">
                        <div id="progressBar" :class="progressBarStyle"
                        style="height:25px;" :style="{width:progressBarWidth + '%'}"></div>
                      </div>
                      <p v-if="progressBarWidth==100">
                        Your poll has been created and stored on Blockchain successfully!                        
                      </p>
                      <p v-else>Your poll is waiting to be confirmed on the Blockchain... {{progressBarWidth}}%</p>
                      <br />
                      
                      <a :href="'/result?search=' + pollAddress" :class="goToPollBtn" target="_blank">Go to Poll</a>
                      <a href="/createpoll" class="btn btn-primary">Create another</a>
                  </div>

                  <div class="form-group">
                    <label for="" class="labelField">Poll Public Address</label>
                    <input type="text" v-model="pollAddress" class="form-control" disabled >
                  </div>
                  <div class="form-group">
                    <label for="" class="labelField">Poll Public Key</label>
                    <input type="text" v-model="pollPublicKey" class="form-control" disabled >
                  </div>
                  <div class="form-group">
                    <label for="" class="labelField">Poll Transaction Hash</label>
                    <input type="text" v-model="pollTxHash" class="form-control" disabled >
                  </div>
                </div>
              </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navigation from '../navigationbar'
import router from '../../router'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import VueQRCodeComponent from 'vue-qrcode-component'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

import { 
    UInt64,Account,Deadline,NetworkType,
    TransferTransaction,TransactionHttp,
    PlainMessage,NetworkCurrencyMosaic,
    AggregateTransaction , Address 
  } from 'nem2-sdk';

const transactionHttp = new TransactionHttp('http://54.169.58.18:3000')

const networkGenerationHash = "046DC13DEF67EBDF82905AE60967E99EEC1DD86F1664D1AF68B11C4500ABADCF"

export default {
    name: 'CreatePoll',
    components: {
      'Navigation':Navigation,
      'qr-code': VueQRCodeComponent,
      QrcodeStream,
      QrcodeDropZone,
      QrcodeCapture
    },
    data() {
      return {
        result: '',
        noStreamApiSupport: false,
        displayCamera: false,
        pollType: 0,
        candidateNumber: 5,
        whitelistNumber: 2,
        pollAddress:'',
        pollPublicKey:'',
        pollTxHash:'',
        pollTitle: 'Blockchain City President 2020',
        pollDesc: 'Vote for the the Blockchain City President of 2020',
        dateEnd: "2015-03-25T10:20",
        timeRemain:'',
        minDate: null,
        doe: null,
        candidate:['Sunny Lu','Vitalik Buterin','John McAfee','Craig Wright','Justin Sun'],
        whitelist:['SCXD75P56TLEUPFZCDDFZV5QR3HGTDVB66ZP4OSV','SCNLIZEZQCDY5477BRJUCUXGQXK6FUZJI3WP3A2S'],
        privateKey: '5D7E87DF82EB6986646B7DBB38CE792117BD106D5179ADC2E1CE0DDE8DBAEE78',

        candidateNumberErr: '',
        whitelistNumberErr: '',
        pollTitleErr: '',
        pollDescErr: '',
        dateEndErr: '',
        privateKeyErr: '',
        formInfoErr:'',

        displayFinal:false, //if True then show QR of poll and poll Info

        interval:null, //for api listener 
        progressBarWidth: 5,
        progressBarStyle:"progress-bar progress-bar-striped progress-bar-animated",
        goToPollBtn:"btn btn-primary disabled"
      }
    },
    mounted(){
      var theAnchor = document.getElementById("moduleNav")
      theAnchor.href = "#modules"
      
      if(!localStorage.usertoken){
        router.push({name: 'Entry' })
      }else if(localStorage.usertoken){
        this.dateEnd = this.setDefaultDate()
        var token = jwtDecode(localStorage.usertoken)
        this.$parent.ID = token.ID
      }

      $("form").keypress(function(e){
        if (e.which == 13) { //Enter key
          return false
        }
      });
    },
    methods:{
      loadPollStatus() {
        // var self = this
        axios.get('http://54.169.58.18:3000/transaction/' + this.pollTxHash + '/status',{})
          .then(function (response){
            console.log("Ticking")
            console.log(response)
            if(this.progressBarWidth < 80){
              this.progressBarWidth = this.progressBarWidth + 15
            }
            if(response.data.group == "confirmed"){              
              this.progressBarWidth = 100
              this.goToPollBtn = "btn btn-primary"
              this.progressBarStyle = "progress-bar bg-success"
              
              clearInterval(this.interval)
              axios.post('/users/createpoll',
              {
                ID: this.$parent.ID,
                publicAddress:this.pollAddress
              }).then(res => {              
                if(res.data.Pass == 1){ //Success
                  console.log(res.data)                
                }
              }).catch(err => {
                console.log(err)
                console.log("error updatin to db")
              })
            }
          }.bind(this))
          .catch(function (error){
            console.log(error)
          })
      },
      readyListener() {
        this.interval = setInterval(function () {
          this.loadPollStatus();
        }.bind(this), 2500);
      },
      announcePoll(){
        if(this.validateForm()){
          this.doe = moment(this.dateEnd).format('x')
          this.formInfoErr = ''
          //step 1: Generate a valid public address as the poll
          this.pollAddress = this.generatePollPublicAddress()
          var pollAddress = this.pollAddress

          //Step 2: Setup the poll data
          var pollData = 'pollData:{"t":"' + this.pollTitle 
                      +'","doe":' + this.doe 
                      + ',"type":' + this.pollType
                      + '}'
          
          //Step 3: Setup poll description
          var pollDesc = 'desc:' + this.pollDesc

          //Step 4: Setup poll candidate option 
          var candidateArr = this.candidate
          candidateArr = this.cleanArray(candidateArr)
          candidateArr = this.getUnique(candidateArr)
          candidateArr = this.returnDoubleQuoteArr(candidateArr)

          var pollCandidate = 'c1:[' + candidateArr + ']'

          //Step 5: Setup poll candidate address 2 
          var candidateAddressArr = []
          for (var i = 0; i < candidateArr.length; i++){
            candidateAddressArr.push('"' + this.generatePublicAddress() + '"')
          }
          var pollCandidateAddr = 'a1:[' + candidateAddressArr +']'
         
          //Public Poll Send aggregate transaction
            const account = Account.createFromPrivateKey(this.privateKey,NetworkType.MIJIN_TEST)
            
            const pollDataTX = this.createTransactionMsg(pollAddress,pollData)
            const pollDescTX = this.createTransactionMsg(pollAddress,pollDesc)
            const pollCandidateTX = this.createTransactionMsg(pollAddress,pollCandidate)
            const pollCandidateAddrTX = this.createTransactionMsg(pollAddress,pollCandidateAddr)

          if(this.pollType == 1){
            //Max 23 whitelister now
            //Step 6: Set up Whitelist and announce  (ONLY FOR PRIVATE POLL)
            var whitelistArr = this.whitelist
            whitelistArr = this.cleanArray(whitelistArr)
            whitelistArr = this.getUnique(whitelistArr)
            whitelistArr = this.returnDoubleQuoteArr(whitelistArr)
            var pollWhitelistArr = 'w1:[' + whitelistArr + ']'
            const pollWhiteListTX = this.createTransactionMsg(pollAddress,pollWhitelistArr)
            console.log(pollWhiteListTX)
            const aggregateTransaction = AggregateTransaction.createComplete(
                Deadline.create(),
                [ 
                  pollDataTX.toAggregate(account.publicAccount),
                  pollDescTX.toAggregate(account.publicAccount),
                  pollCandidateTX.toAggregate(account.publicAccount),
                  pollCandidateAddrTX.toAggregate(account.publicAccount)
                  ,pollWhiteListTX.toAggregate(account.publicAccount)
                ],NetworkType.MIJIN_TEST,[]
            ) 
            console.log(aggregateTransaction)
            this.announceAggregateTX(account,aggregateTransaction)
          }else{
            //Public Poll
            const aggregateTransaction = AggregateTransaction.createComplete(
                Deadline.create(),
                [ 
                  pollDataTX.toAggregate(account.publicAccount),
                  pollDescTX.toAggregate(account.publicAccount),
                  pollCandidateTX.toAggregate(account.publicAccount),
                  pollCandidateAddrTX.toAggregate(account.publicAccount)
                ],NetworkType.MIJIN_TEST,[]
            )       
            this.announceAggregateTX(account,aggregateTransaction)
          }
        }else{
          this.formInfoErr = 'Please fix the error above before proceeding!'
        }
      }, 
      announceAggregateTX(account,aggregateTransaction){ //Sign and Announce Tx
        const signedTransaction = account.sign(aggregateTransaction, networkGenerationHash)        
        console.log(signedTransaction)
        document.getElementById("registerBtn").disabled = true
        this.displayFinal = true
        this.pollTxHash = signedTransaction.hash
        transactionHttp.announce(signedTransaction)
          .subscribe(aggrTx =>{
            console.log("Announced!")
            console.log(aggrTx)
            this.readyListener()
          }, err => console.error(err))
      },     
      createTransactionMsg(pollAddress,pollData){ //Not signed yet
          const recipientAddress = Address.createFromRawAddress(pollAddress)
          const transferTransaction = TransferTransaction.create(
              Deadline.create(),
              recipientAddress,
              [NetworkCurrencyMosaic.createRelative(0)],
              PlainMessage.create(pollData),
              NetworkType.MIJIN_TEST,
              UInt64.fromUint(0))
              
          return transferTransaction
      },
      //Nem SDK functions:
      generatePollPublicAddress(){
        var tempAccount = Account.generateNewAccount(NetworkType.MIJIN_TEST)
        this.pollPublicKey = tempAccount.publicKey
        var selfTransaction = this.createTransactionMsg(tempAccount.address.address,"Activate_poll")
        var signedTransaction = tempAccount.sign(selfTransaction,networkGenerationHash)
        console.log("1 Below is generated public poll address:")
        console.log(signedTransaction)
        transactionHttp
          .announce(signedTransaction)
          .subscribe(x => console.log(x), err => console.error(err))
        return tempAccount.address.address
      },
      generatePublicAddress(){
        var tempAccount = Account.generateNewAccount(NetworkType.MIJIN_TEST)        
        var selfTransaction = this.createTransactionMsg(tempAccount.address.address,"Activate_candidate")
        var signedTransaction = tempAccount.sign(selfTransaction,networkGenerationHash)
        console.log("2 Below is generated candidate address:")
        console.log(signedTransaction)
        transactionHttp
          .announce(signedTransaction)
          .subscribe(x => console.log(x), err => console.error(err))
        return tempAccount.address.address
      },
      //Utility
      getUnique(array){ // Filter to get unique values onlyfrom an array
          var uniqueArray = [];
          // Loop through array values
          for(var value of array){
              if(uniqueArray.indexOf(value) === -1){
                  uniqueArray.push(value);
              }
          }
          return uniqueArray;
      },
      cleanArray(oldArr){ //Remove all falsy values: undefined, null, 0, false, NaN and "" (empty string)
        var newArray = new Array();
        for (var i = 0; i < oldArr.length; i++) {
          if (oldArr[i]) {
            if(oldArr[i]!='""' && oldArr[i]!='" "'){
              newArray.push(oldArr[i]);
            }
          }
        }
        return newArray; 
      },
      returnDoubleQuoteArr(Arr){
        for(var i = 0; i < Arr.length; i++){
          Arr[i] = '"' + Arr[i] + '"'
        }
        return Arr
      },
      //Initial Functions:
      setDefaultDate(){
        var dateTime = moment().add(1,'hours')
        dateTime = dateTime.format().split('+')[0] //Remove +08:00        
        dateTime = dateTime.substr(0,dateTime.length -3) // Remove the :ss to display AM/PM on input field
        this.minDate = dateTime                   
        return dateTime
      },      
      pollSwap(){
        if(this.pollType == 0){
          this.pollType = 1
        }else{
          this.pollType = 0
          if(this.whitelistNumber < 2){
            this.whitelistNumber = 2
            this.whitelistNumberErr = ''
          }
        }
      },
      //QR code reader: 
      toggleCameraDiv(){
        if(this.displayCamera == true){
          this.displayCamera = false
        }else{
          this.displayCamera = true
        }
      },
      onDecode(result) {
        if(result.length == 60 || result.length == 64){
          this.privateKey = result
          this.displayCamera = false
        }else{
          result =JSON.parse(result)
          this.privateKey = result.data.addr
          this.displayCamera = false
        }
      },
      logErrors (promise) {
        promise.catch(console.error)
      },
      async onInit (promise){
        try {
          await promise
        } catch (error) {
          if (error.name === 'StreamApiNotSupportedError') {
            this.noStreamApiSupport = true
          }
        }
      },      
      //check validator below
      validateForm(){
        return (
          this.pollTitleCheck()* 
          this.dateEndCheck()* 
          this.privateKeyCheck()
        )
      },
      candidateNumberCheck(){
        if(this.candidateNumber < 2){
          this.candidateNumberErr = 'The number of candidates must be more than or equal to 2!'
          this.candidateNumber = 2
          return false
        }else{
          this.candidate = Array(parseInt(this.candidateNumber))
          this.candidateNumberErr = ''
          return true
        }
      },
      whitelistNumberCheck(){
        if(this.whitelistNumber < 2){
          this.whitelistNumberErr = 'The number of whitelist address must be more than or equal to 2!'
          this.whitelistNumber = 2
          return false
        }else{
          this.whitelist = Array(parseInt(this.whitelistNumber))
          this.whitelistNumberErr = ''
          return true
        }
      },
      pollTitleCheck(){
        if(this.pollTitle.length < 1){
          this.pollTitleErr = 'Poll Title cannot be empty!'
          return false
        }else if(this.pollTitle.length > 64){
          this.pollTitleErr = 'Poll Title must be shorter than 64 character!'
          return false
        }else{
          this.pollTitleErr = ''
          return true
        }
      },
      pollDescCheck(){
        if(this.pollDesc.length > 1219){
          this.pollDescErr = 'Poll Description must be shorter than 1218 character!'
          return false
        }else{
          this.pollDescErr = ''
          return true
        }
      },
      dateEndCheck(){
        if(this.dateEnd < this.minDate){
          this.dateEndErr = 'Poll duration must be at least 1 hour long.'
          return false
        }else{
          this.dateEndErr = ''
          return true
        }
      },
      privateKeyCheck(){
        if(this.privateKey.length == 60 || this.privateKey.length == 64){
          this.privateKey = this.privateKey.toLowerCase()
          this.privateKeyErr = ''
          return true
        }else if(this.privateKey.length < 1){
          this.privateKeyErr = 'Private key cannot be empty!'
          return false
        }else{
          this.privateKeyErr = 'You have entered an invalid private key!'
          return false
        }
      }
    }
  }
</script>

<style scoped>
/* qr code */
qr-code{
  text-align:center;
}
/* Error msg text */
.text-error{
  padding-top: 5px;
  color: #fa4848;
  margin: 0 0 7px 0;
  font-size: 12px;
  max-width: 100%;
}
header{
    padding: 148px 0 100px;
    height: 50vh;
    background-image: url(../../assets/img/zacong-half.jpg);
    background-size: cover;
    background-repeat:no-repeat;
}
/* Create Poll Button */
#divRegisterBtn{
  text-align:center;
}
#registerBtn{
	box-shadow:inset 0px 1px 0px 0px #97c4fe;
	background-color:#3d94f6;
	border-radius:6px;
	border:1px solid #337fed;
	display:inline-block;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	padding:8px 28px;
}
#registerBtn:hover {
  filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#1e62d0', endColorstr='#3d94f6',GradientType=0);
	background-color:#1e62d0;
}
#registerBtn:active{
  position:relative;
	top:1px;
}

 /* Hide HTML5 Up and Down arrows. */
.form-group input[type="number"]::-webkit-outer-spin-button, .form-group input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
 
.form-group input[type="number"] {
    -moz-appearance: textfield;
}

.centerIt{
  width:256px; 
  margin-left:auto;
  margin-right:auto;
  text-align:center;
}

a.btn { 
  border-radius: .25rem;
  border: 1px solid transparent;
  padding: .5rem 1rem;
  color: #fff; 
}

a.btn:hover {
  border-radius: .25rem;
}

</style>    
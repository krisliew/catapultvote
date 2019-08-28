<template>
  <div>
    <Navigation />
    <section id="modules">      
      <header class="bg-primary text-white" >
        <div class="container text-center">
          <h1>Poll Result</h1>
          <p class="lead"><a href="/modules"> Modules </a> > <a> Result </a></p>
        </div>
      </header>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="form-group">
              <label for="" class="labelField">Set Node:</label>
              <input v-model="catapultNodeServer" type="text" maxlength="64" class="form-group">              
            </div>
            <div class="form-group">
              <label for="" class="labelField">Search By Poll Public Key:</label>
              <input v-model="pollPublicKey" type="text" maxlength="64" class="form-group">              
            </div>
            <div class="form-group">
              <button type="button" @click="getPollIncomingTx(pollPublicKey)"> Search Poll</button>                                         
            </div>
          </div>
        </div>
      </div>

    <div class="container" id="pollResult">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h1>Poll Information</h1>
          <p> Title: {{pollTitle}} </p>
          <p> Description: {{pollDesc}} </p>
          <p> Poll End Time: {{DateTimeEnd}} <span id="statusColour">{{ status }}</span></p>
          <p> Type: {{pollType}}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8 mx-auto">
          <vue-poll v-bind="options" @addvote="addVote"/>          
        </div>
      </div>

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
    </div>


    </section>
  </div>
</template>

<script>
  import Navigation from '../navigationbar'
  import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
  import axios from 'axios'
  import moment from 'moment'
  import VuePoll from 'vue-poll'
  import { 
    TransactionHttp,
    UInt64,Account,AccountHttp,
    Deadline,NetworkType,QueryParams,
    PublicAccount,TransferTransaction,
    NetworkCurrencyMosaic,PlainMessage,Address 
  } from 'nem2-sdk'
  
  // const Account = nem2Sdk.Account,
  //     AccountHttp = nem2Sdk.AccountHttp,
  //     Deadline = nem2Sdk.Deadline,
  //     NetworkType = nem2Sdk.NetworkType,
  //     QueryParams = nem2Sdk.QueryParams,
  //     PublicAccount = nem2Sdk.PublicAccount,
  //     TransferTransaction = nem2Sdk.TransferTransaction,
  //     NetworkCurrencyMosaic = nem2Sdk.NetworkCurrencyMosaic,
  //     PlainMessage = nem2Sdk.PlainMessage,
  //     Address = nem2Sdk.Address;      
  const networkGenerationHash = "046DC13DEF67EBDF82905AE60967E99EEC1DD86F1664D1AF68B11C4500ABADCF"

  export default {
    name: 'Modules',
    components: {
      VuePoll,
      'Navigation':Navigation,
      QrcodeStream,
      QrcodeDropZone,
      QrcodeCapture
    },
    data() {
      return {
        catapultNodeServer:'http://54.169.58.18:3000',
        pollPublicKey:'D3C58CFF00785D17B6D36AEA5A95B4D6E722963E0F02ADD5DE69B675D45F7947',
        pollDataJSON: null,

        pollData:'',
        pollCandidates:[],
        pollCandidatesAddr:[],
        pollCandidatePublicKey:[],
        pollVote:[], //Concluded Number of Vote 
        pollDesc:'',
        status:'',

        pollTitle:'',    
        DateTimeEnd:null,
        pollType:null,
        doe: null,

        options: {
          question: '',
          answers: [
            //Value = "Candidate Public Key",
            //Text = "Candidate Name",
            //Vote = "Amount of TX / Vote on Blockchain"
          ]
        },
        //QR code : Vote
        privateKey: '',
        privateKeyErr: '',
        noStreamApiSupport: false,
        displayCamera: false,
      }
    },
    mounted(){
      document.getElementById("pollResult").style.display = 'none'
    },
    methods:{
      addVote(obj){
        obj.text = this.removeVote(obj) //remove default vote as the vote hasn't been confirmed on blockchain

        this.privateKey = prompt("Please input private key! (Must be 64-66 length \nClick Cancel to view result instead")
        if(this.privateKey !== null){
          if(this.privateKey.length == 64 || this.privateKey.length == 66){
            var yourAccount = Account.createFromPrivateKey(this.privateKey,NetworkType.MIJIN_TEST)
            var transferTransaction = this.createTransactionMsg(obj.value,"")
            var signedTransaction = yourAccount.sign(transferTransaction,networkGenerationHash)
            console.log(signedTransaction.hash)
            if (confirm('Are you sure you want to vote for candidate: ' + obj.text + '?') == true){
              var transactionHttp = new TransactionHttp(this.catapultNodeServer)
              transactionHttp.announce(signedTransaction)
              .subscribe(x => console.log(x), err => console.error(err))
            }else{
              //Refresh page
            }
          }else{
            alert("Private Key length error!")
            //Refresh page 
          }
          console.log(this.options.answers)
        }        
      },
      removeVote(obj){
        for(var x = 0; x < this.options.answers.length; x++){
          if(this.options.answers[x].value == obj.value){
            this.options.answers[x].votes -= 1
            return this.options.answers[x].text
          }
        }
      },
      createTransactionMsg(receiveAddress,msg){ //Not signed yet
          const recipientAddress = Address.createFromRawAddress(receiveAddress)
          const transferTransaction = TransferTransaction.create(
              Deadline.create(),
              recipientAddress,
              [NetworkCurrencyMosaic.createRelative(0)],
              PlainMessage.create(msg),
              NetworkType.MIJIN_TEST,
              UInt64.fromUint(0))
              
          return transferTransaction
      },
      getPollIncomingTx(publicKey){        
        this.options = {
          question: '',
          showResults:false,
          answers: [
            //Value = "Candidate Public Key",
            //Text = "Candidate Name",
            //Vote = "Amount of TX / Vote on Blockchain"
          ]
        }

        const accountHttp = new AccountHttp(this.catapultNodeServer)
        const pageSize = 100; // Page size between 10 and 100, otherwise 10
        const publicAccount =  PublicAccount.createFromPublicKey(publicKey, NetworkType.MIJIN_TEST)
        
        accountHttp
            .transactions(publicAccount, new QueryParams(pageSize))
            .subscribe(transactions => this.showResult(transactions), err => console.error(err))
      },
      showResult(result){// "result" is the Data GET from Catapult Blockchain
        
        var candidates,candidateAddr,candidatePublicKey = [], // use to GET incoming transaction
        candidateAddrName = '{', candidateAddrVote = '{' //JSON ARRAY    
        ,votedAddr = [] 
        document.getElementById("pollResult").style.display = 'block'
        console.log(result)
        
        /*TO-IMPROVE:
         -Filter which confirmed incoming Transaction is the latest Aggregate Transaction
        Limitation to improve:
        1) Can only handle 23 Candidate currently:
          a) a2, c2...a3,c3 can be implemented to increase number of candidate be registered in a poll/an election
        */
        for(var i = 0; i < result.length ; i++){
          if(result[i].type == 16705){ //Confirm that this index is an aggregate TX            
            for(var x = 0; x < result[i].innerTransactions.length; x++){
              if((result[i].innerTransactions[x].message.payload.substring(0, 2)) == 'po'){
                this.pollData = JSON.parse((result[i].innerTransactions[x].message.payload).substring(9));
              }else if((result[i].innerTransactions[x].message.payload.substring(0, 2)) == 'de'){
                this.pollDesc = (result[i].innerTransactions[x].message.payload).substring(5)
              }else if((result[i].innerTransactions[x].message.payload.substring(0, 2)) == 'c1'){
                candidates = JSON.parse((result[i].innerTransactions[x].message.payload).substring(3));                
              }else if((result[i].innerTransactions[x].message.payload.substring(0, 2)) == 'a1'){
                candidateAddr = JSON.parse((result[i].innerTransactions[x].message.payload).substring(3));                
              }
            }
          }
        }
        
        //TO keep track of the candidate name with the address
        for(var c = 0; c < candidateAddr.length; c++){
          if(c > 0){
            candidateAddrName = candidateAddrName + ',"' + candidateAddr[c] + '":"' + candidates[c] +'"'
          }else{
            candidateAddrName = candidateAddrName + '"' + candidateAddr[c] + '":"' + candidates[c] +'"'
          }
        }        
        candidateAddrName = JSON.parse(candidateAddrName + '}')        

        //TO Keep track of the candidate vote with the address 
        for(var v = 0; v < candidateAddr.length; v++){
          if(v > 0){
            candidateAddrVote = candidateAddrVote + ',"' + candidateAddr[v] + '":[]'
          }else{
            candidateAddrVote = candidateAddrVote + '"' + candidateAddr[v] + '":[]'
          }
        }
        candidateAddrVote = JSON.parse(candidateAddrVote + '}')
                
        this.pollTitle = this.pollData.t
        this.DateTimeEnd = moment(this.pollData.doe).format('DD/MM/YYYY') + ' at ' + moment(this.pollData.doe).format('hh:mm a')
        
        if(this.pollData.doe > moment().format('x')){
          this.status = '(ONGOING)'
          document.getElementById('statusColour').style.color = 'green'
        }else{
          this.status = '(EXPIRED)'
          this.options.showFinalResults = true
          document.getElementById('statusColour').style.color = 'red'
        }
        this.pollType = this.pollData.type //Type 0 = Public, Type 1 = Private(Whitelist) 
      
      //Private Whitelist
        if(this.pollData.type == 1){
          this.pollType = 'Private (Whitelist)'
          //TO-DO: Whitelist Array Filter / functions
        }else if(this.pollData.type == 0){
          this.pollType = 'Public'
        }

        //1) api request to get account Public Key
        var i = 0 // Temporary var solution to "synchronous" the GET PUBLIC Key Below using Public Address
        var counter = 0 // To execute Result2() function after all vote is counted in
        for(var x = 0; x < candidateAddr.length; x++){
          const accountHttp = new AccountHttp(this.catapultNodeServer)
          var address = Address.createFromRawAddress(candidateAddr[x])
          
          accountHttp.getAccountInfo(address).subscribe(getResult => {
            candidatePublicKey.push(getResult.publicKey)

            //Get each account vote count and store into an array
            var publicAccount =  PublicAccount.createFromPublicKey(candidatePublicKey[i], NetworkType.MIJIN_TEST)
            var pageSize = 100 // 10 - 100 range page size            
            accountHttp.transactions(publicAccount, new QueryParams(pageSize)).subscribe(transactions => {
              if(transactions.length < 2){
                //= no vote on the account (Just ignore)
              }else{
                for(var loop = 0; loop < transactions.length; loop++){
                  if(transactions[loop].message.payload == "Activate_candidate"){
                    //Ignore "activate account" transaction
                  }else{
                    var year = transactions[loop].deadline.value._date._year
                    var month = transactions[loop].deadline.value._date._month
                    var day = transactions[loop].deadline.value._date._day
                    var hour = transactions[loop].deadline.value._time._hour
                    var minute = transactions[loop].deadline.value._time._minute
                    var second = transactions[loop].deadline.value._time._second
                    var txTime = moment(year + '-' + month + '-' + day + ' ' + hour +':' + minute + ':' + second ,'YYYY-MM-DD HH:mm::ss').format('x')
                    
                    if(txTime < this.pollData.doe){
                      candidateAddrVote[transactions[loop].recipient.address].push(transactions[loop].signer.address.address)
                    }
                  }
                }
              }
              counter++
              if(counter == candidatePublicKey.length){
                this.filterResult(candidateAddrVote,candidateAddrName,candidateAddr)
              }              
            }, 
            err => console.error(err))
            i++
          },
          err => console.error(err))  
        }
      },
      filterResult(candidateAddrVote,candidateAddrName,candidateAddr){        
        //Filter Function is to:      
        // Prevent Double voting - Vote 1 candidate more than once (counted as 0)
        // Prevent Multi Voting - Vote more than 1 candidate (counted as 0)
        
        var badAddress = [] //Store voter address that vote multiple candidate
        //Clean Duplicate Vote
        for(var i = 0; i < candidateAddr.length; i++){
          candidateAddrVote[candidateAddr[i]] = this.getUnique(candidateAddrVote[candidateAddr[i]])
          for(var x = 0; x < candidateAddrVote[candidateAddr[i]].length; x++){
            badAddress.push(candidateAddrVote[candidateAddr[i]][x])
          }
        }
        //Clean Multiple Vote                
        badAddress = this.getNotUnique(badAddress)
        badAddress = this.getUnique(badAddress)
        for(var i = 0; i < candidateAddr.length; i++){
          candidateAddrVote[candidateAddr[i]] = this.removeDuplicates(badAddress,candidateAddrVote[candidateAddr[i]])
        }

        console.log(candidateAddrVote)
        for(var i = 0; i < candidateAddr.length; i++){
          this.sendResultToVuePoll(candidateAddrName[candidateAddr[i]],candidateAddr[i],candidateAddrVote[candidateAddr[i]].length)
        }
      },
      sendResultToVuePoll(candidateName,candidateAddr,candidateVote){
          //display poll result / place to vote
          this.options.answers = this.options.answers.concat({
            value: candidateAddr,
            text: candidateName,
            votes: candidateVote
          })
      },
      //Function to get unique values from an array
      getUnique(array){
        var uniqueArray = [];
        
        // Loop through array values
        for(var value of array){
            if(uniqueArray.indexOf(value) === -1){
                uniqueArray.push(value);
            }
        }
        return uniqueArray;
      },	
	    //Remove Unique value from array 
      getNotUnique(array){
        var map = new Map();
        
        array.forEach(a => map.set(a, (map.get(a) || 0) + 1));
        
        return array.filter(a => map.get(a) > 1);
      },
      //Remove duplicate based on another array element 
      removeDuplicates(arr,arr2){
        return arr2.filter(function(v) {
        return arr.indexOf(v) === -1
        })
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
header{
    padding: 148px 0 100px;
    height: 50vh;
    background-image: url(../../assets/img/zacong-half.jpg);
    background-size: cover;
    background-repeat:no-repeat;
}
</style>
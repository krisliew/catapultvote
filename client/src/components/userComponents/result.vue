<template>
  <div>
    <Navigation />
    <section id="result">
      <header class="bg-primary text-white" >
        <div class="container text-center">
          <h1>Poll Result</h1>
          <p class="lead"><a href="/modules"> Modules </a> > <a> Result </a></p>
        </div>
      </header>
      <div class="container" id="pollResultDiv" v-show="toggleVote==0">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <!-- <div class="form-group">
              <label for="" class="labelField">Set Node:</label>
              <input v-model="catapultNodeServer" type="text" maxlength="64" class="form-group">
            </div> -->
            <div class="form-group">
              <div class="input-group mb-3">             
                <input v-model="pollInput" type="text" maxlength="64" class="form-group form-control" placeholder="Public Address / Public Key">
                <button type="button" @click="searchPoll(pollInput)"> Search Poll</button>
                <button type="button" @click="toggleCameraDiv">Toggle Camera</button>
              </div>              
              <p class="text-error"> {{ pollInputErr }}</p>
              <qrcode-capture @decode="onDecode" />
              <div v-show="displayCamera == true"> 
                <qrcode-drop-zone @decode="onDecode" @init="logErrors">
                  <qrcode-stream @decode="onDecode" @init="onInit" />
                </qrcode-drop-zone>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div class="container" id="pollResult" v-show="displayResult == true">
      <div class="row" v-show="toggleVote==0">
        <div class="col-lg-8 mx-auto">
          <h1>Poll Information</h1>
          <p><b> Title:</b> {{pollTitle}} </p>
          <p><b> Description:</b> {{pollDesc}} </p>
          <p><b> Poll End Time:</b> {{DateTimeEnd}} <span id="statusColour">{{ status }}</span></p>
          <p><b> Type:</b> {{pollType}}</p>
          <p style="overflow-wrap: break-word;"><b>Poll Public Address:</b> {{ pollAddress }}</p>
          <p style="overflow-wrap: break-word;"><b>Poll Public Key:</b> {{ pollPublicKey }}</p>
        </div>
        <div class="col-lg-8 mx-auto text-center">
          <button v-show="watchlistToggler==0"  class="btn btn-primary bg-success" v-on:click="addToWatchlist">Add to Watchlist</button>
          <button v-show="watchlistToggler==1"  class="btn btn-primary bg-danger" v-on:click="removeFromWatchlist">Remove from Watchlist</button>
        </div>        
      </div>
      
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div v-show="toggleVote==0">
            <div id="graphResult" v-for="(candidateAddr1,index) in candidateAddr" :key="index">
              <div  v-if="candidateAddrVote[candidateAddr[index]].length > 0">
                <p>            
                  Candidate: {{ candidateAddrName[candidateAddr[index]] }} <br/>
                  Votes: {{candidateAddrVote[candidateAddr[index]].length}} <br/>
                </p>
                <div class="progress" style="height: 20px;">
                  <div class="progress-bar" role="progressbar" :style="{width: candidateAddrPercentage[candidateAddr[index]] + '%'}" style="color:white; font-size: 15px;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    {{ candidateAddrPercentage[candidateAddr[index]]}}% ({{ candidateAddrVote[candidateAddr[index]].length }} vote(s))
                  </div>
                </div>
                <br/>
                <div v-if="status=='(ONGOING)'" style="margin-right:auto; margin-left:auto; width:150px;">
                  <button type="button" id="btnVote" v-on:click="sendToConfirm(candidateAddr[index])" 
                  class="btn btn-primary bg-success"  style="width:118px; padding:8px;"> Vote </button>
                </div>
              </div> <!--END of V-IF DIV-->
              <div id="graphResult" v-else>
                <p>
                  Candidate: {{ candidateAddrName[candidateAddr[index]] }} <br/>
                  Votes: {{candidateAddrVote[candidateAddr[index]].length}} <br/>
                </p>
                <div class="progress" style="height: 20px;">
                  <div class="progress-bar" role="progressbar" style="width: 0%; color:black; font-size: 15px;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0% (0 vote)</div>
                </div>
                <br/>
                <div v-if="status=='(ONGOING)'" style="margin-right:auto; margin-left:auto; width:150px;">
                  <button type="button" id="btnVote" v-on:click="sendToConfirm(candidateAddr[index])" 
                  class="btn btn-primary bg-success"  style="width:118px; padding:8px;"> Vote </button>
                </div>
              </div>  <!--END of V-ELSE DIV-->
            </div><!--GRAPH RESULT DIV-->
            <p><i>Total Vote: {{ totalVoteCount }}</i></p>
          </div>

          <div class="align-content-center" v-show="toggleVote==1">      
            <h2> Vote confirmation </h2>              
            <p>Please input private key to confirm vote for <u>{{ targetCandidate }}</u>: </p>            
            <div class="input-group mb-3"> 
              <div class="input-group-prepend">
                <label class="btn btn-primary">Private Key</label>
              </div>
              <input type="password" v-on:change="privateKeyCheck" v-model="privateKey" maxlength="64" class="form-control decode-result" >
            </div>
            <p class="text-error"> {{ privateKeyErr }} </p>
            <qrcode-capture @decode="onDecodePrivate" />
            <div class="text-center">                         
              <button class="btn btn-primary bg-success" @click="voteConfirm">Confirm</button>
              <button class="btn btn-primary bg-danger" @click="voteCancel">Cancel</button>
            </div>
          </div>

          <div class="align-content-center" v-show="toggleVote==2">
            <div class="text-center">
              <h2>Thank you for your vote!</h2>
              <div class="progress" style="height:25px;">
                <div id="progressBar" :class="progressBarStyle"
                style="height:25px;" :style="{width:progressBarWidth + '%'}"></div>
              </div>
              <p v-if="progressBarWidth==100">
                Your vote has been confirmed on Blockchain successfully! <br />
                Redirecting to the poll result in...{{ redirectCountdown }}s <br />
                (<a :href="'/result?search=' + pollAddress" >Redirect </a>instantly)
              </p>
              <p v-else>Please wait while your vote is being confirmed on the Blockchain... {{progressBarWidth}}%</p>
              <br />
            </div>
            <div class="form-group">
              <label for="" class="labelField">Poll Transaction Hash</label>
              <input type="text" v-model="targetTxHash" class="form-control" disabled >
            </div>
          </div>
          

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
  import moment from 'moment'
  import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'  
  
  import { 
    TransactionHttp,BlockHttp,
    UInt64,Account,AccountHttp,
    Deadline,NetworkType,QueryParams,
    PublicAccount,TransferTransaction,
    NetworkCurrencyMosaic,PlainMessage,Address 
  } from 'nem2-sdk'

 
  //Need fix on gen hash
  const networkGenerationHash = "046DC13DEF67EBDF82905AE60967E99EEC1DD86F1664D1AF68B11C4500ABADCF"

  export default {
    name: 'Modules',
    components: {
      'Navigation':Navigation,
      QrcodeStream,
      QrcodeDropZone,
      QrcodeCapture
    },
    data() {
      return {
        catapultNodeServer:'http://54.169.58.18:3000',        
        displayResult:false,
        pollInput:'',
        pollPublicKey:'',
        pollAddress: '',
        pollDataJSON: null,

        pollData:'',
        pollDesc:'',
        status:'',
        watchlistToggler: null, 

        pollTitle:'',    
        DateTimeEnd:null,
        pollType:null,
        doe: null,

        //Graph result
        totalVoteCount:null,
        candidateAddrName:'',
        candidateAddr:'',
        candidateAddrVote:'',
        candidateAddrPercentage: '{',

        //QR code : Vote
        pollInputErr:'',
        noStreamApiSupport: false,
        displayCamera: false,

        //Vote Confirmation:
        privateKey:"",
        privateKeyErr:"",
        toggleVote:0, // 1 = display to "vote confirmation", 2 = display "vote tx confirm/unconfirm status"
        targetCandidate:"",
        targetCandidateAddr:"",
        targetTxHash:"",

        progressBarWidth:5,
        progressBarStyle:"progress-bar progress-bar-striped progress-bar-animated",
        interval:null,
        redirectCountdown:10
      }
    },
    mounted(){
      this.displayResult = false
      //url params, auto search poll on load:
      if(this.$route.query.search !== undefined){
        console.log(this.$route.query.search)
        this.pollInput = this.$route.query.search
        this.searchPoll(this.pollInput)
        this.pollInput = ''
      }
    },
    methods:{
        loadVoteStatus() {
        axios.get('http://54.169.58.18:3000/transaction/' + this.targetTxHash + '/status',{})
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

              this.interval = setInterval(function() {
                this.redirectCountdown--
                if(this.redirectCountdown == 0){
                  this.$router.go(this.$route.fullPath)
                }
              }.bind(this),1000)
              // Add feature: Add to voted poll table in MySQL to prevent user double voting (optional)
              // axios.post('/users/votedpoll',
              // {
              //   ID: this.$parent.ID,
              //   publicAddress:this.pollAddress
              // }).then(res => {              
              //   if(res.data.Pass == 1){ //Success
              //     console.log(res.data)                
              //   }
              // }).catch(err => {
              //   console.log(err)
              //   console.log("error updatin to db")
              // })
            }
          }.bind(this))
          .catch(function (error){
            console.log(error)
          })
      },
      readyVoteListener() {
        this.interval = setInterval(function () {
          this.loadVoteStatus();
        }.bind(this), 2500);
      },
      voteConfirm(){
        //Future TODO: Add private key validator for MIJIN_TEST
        if(this.privateKeyCheck()){
            this.toggleVote = 2
            var yourAccount = Account.createFromPrivateKey(this.privateKey,NetworkType.MIJIN_TEST)
            var transferTransaction = this.createTransactionMsg(this.targetCandidateAddr,"")
            var signedTransaction = yourAccount.sign(transferTransaction,networkGenerationHash)
            this.targetTxHash = signedTransaction.hash
            var transactionHttp = new TransactionHttp(this.catapultNodeServer)

            transactionHttp.announce(signedTransaction)
            .subscribe(x =>{
              this.targetTxHash = signedTransaction.hash
              this.readyVoteListener()
              console.log(x)
            }, err => console.error(err))
        }
      },
      voteCancel(){
        this.toggleVote = 0
        this.privateKey = ""
        this.privateKeyErr = ""        
        this.targetCandidate = ""
        this.targetCandidateAddr = ""
      },
      sendToConfirm(candidateAddress){
        this.targetCandidate = this.candidateAddrName[candidateAddress]
        this.targetCandidateAddr = candidateAddress
        this.toggleVote = 1 //To show confirmation
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
      toggleWatchlistBtn(pollAddress){
        var self = this
        if(this.$parent.ID !== ""){
          axios.get('/users/checkwatchlist',{
            params:{
                ID: this.$parent.ID,
                publicAddress:pollAddress
              }
            })
            .then(function (response){
              console.log(response)
              if(response.data.length > 0){
                self.watchlistToggler = 1
              }else if(response.data.length == 0){
                self.watchlistToggler = 0
              }
            })
            .catch(function (error){
              console.log(error)
            })
        }
      },
      addToWatchlist(){
        axios.post('/users/addwatchlist',
          {
            ID: this.$parent.ID,
            publicAddress:this.pollAddress
          }).then(res => {
            console.log(res.data)
            if(res.data.Pass == 1){ //Success
              this.watchlistToggler = 1
            }else if(res.data.Error == 1062){
              alert("Poll is already in your watchlist!")
            }
          }).catch(err => {
            console.log(err)
            console.log("error updatin to db (insert)")
          })
      },
      removeFromWatchlist(){
        axios.delete('/users/removewatchlist',          
          {
            data:{
            ID: this.$parent.ID,
            publicAddress:this.pollAddress
          }
          }).then(res => {
            console.log(res.data)
            if(res.data.Pass == 1){ //Success
              this.watchlistToggler = 0
            }
          }).catch(err => {
            console.log(err)
            console.log("error updatin to db (delete)")
          })
      },
      searchPoll(userInput){
        this.pollAddress = ''
        this.pollPublicKey = ''

        if(this.pollPublicKeyCheck() == 1){
          //TODO: Get public key first, then only public key search
          const accountHttp = new AccountHttp(this.catapultNodeServer)
          var address = Address.createFromRawAddress(userInput)
          accountHttp.getAccountInfo(address).subscribe(accountInfo => {
              this.pollPublicKey = accountInfo.publicKey
              this.publicKeySearch(accountInfo.publicKey)
            },err =>{              
              if(err.statusCode == 404){
                this.pollInputErr = 'ERROR 404: Poll information is not found on this address'
                this.displayResult = false
              }else{
                console.error(err)
              }
            });
        }else if(this.pollPublicKeyCheck() == 2){
          this.pollPublicKey = userInput
          this.publicKeySearch(userInput)
        }
      },
      publicKeySearch(publicKeySearching){
        // Public Key Search
        
        const accountHttp = new AccountHttp(this.catapultNodeServer)
        const pageSize = 100; // Page size between 10 and 100, otherwise 10
        const publicAccount =  PublicAccount.createFromPublicKey(publicKeySearching, NetworkType.MIJIN_TEST)
        accountHttp.transactions(publicAccount, new QueryParams(pageSize))
          .subscribe(transactions =>{            
            if(transactions.length > 1){ 
              this.showResult(transactions)
            }else{
              this.pollInputErr = 'ERROR 404: Poll information is not found on this address'
              this.displayResult = false
            }
          }, err =>{
            console.error(err)
          })
      },
      showResult(result){// "result" is the Data GET from Catapult Blockchain
        var whitelistAddr //Temporary solution
        var candidates,candidateAddr,candidatePublicKey = [], // use to GET incoming transaction
        candidateAddrName = '{', candidateAddrVote = '{' //JSON ARRAY
        ,votedAddr = [] 
        this.displayResult = true
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
                candidates = JSON.parse((result[i].innerTransactions[x].message.payload).substring(3))
              }else if((result[i].innerTransactions[x].message.payload.substring(0, 2)) == 'a1'){
                candidateAddr = JSON.parse((result[i].innerTransactions[x].message.payload).substring(3))
              }else if((result[i].innerTransactions[x].message.payload.substring(0, 2)) == 'w1'){ //Temporary solution
                whitelistAddr = JSON.parse((result[i].innerTransactions[x].message.payload).substring(3))
              }
            }
            this.pollAddress = result[0].innerTransactions[0].recipient.address
          }
        }
        
        console.log("Whitelist Address:")
        console.log(whitelistAddr)
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
          document.getElementById('statusColour').style.color = 'red'
        }
        this.pollType = this.pollData.type //Type 0 = Public, Type 1 = Private(Whitelist) 

        //1) api request to get account Public Key
        var i = 0 // Temporary var solution to "synchronous" the GET PUBLIC Key Below using Public Address
        var counter = 0 // To execute Result2() function after all vote is counted in
        var counterTX = 0 // For Block Height section to push addr
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
                    //This code doesn't consider timestamp of the TX
                    candidateAddrVote[transactions[loop].recipient.address].push(transactions[loop].signer.address.address)

                    //This code below consider timestamp (fixing)
/*
                   const blockHttp = new BlockHttp(this.catapultNodeServer)
                    blockHttp.getBlockByHeight(transactions[loop].transactionInfo.height.lower).subscribe(block =>{
                      console.log(block.height)
                      console.log(moment((block.timestamp.compact() / 1000 +1459468800) * 1000).format('YYYY-MM-DD HH:mm:ss'))
                      var txTime = moment((block.timestamp.compact() / 1000 +1459468800) * 1000).format('x')
                      console.log(txTime)
                      console.log("vs below")
                      console.log(this.pollData.doe)
                      if(txTime < this.pollData.doe){
                        //candidateAddrVote[transactions[loop].recipient.address].push(transactions[loop].signer.address.address)
                      }
                    }, err => console.error(err))
*/
                    // var year = transactions[loop].deadline.value._date._year
                    // var month = transactions[loop].deadline.value._date._month
                    // var day = transactions[loop].deadline.value._date._day
                    // var hour = transactions[loop].deadline.value._time._hour
                    // var minute = transactions[loop].deadline.value._time._minute
                    // var second = transactions[loop].deadline.value._time._second
                    // var txTime = moment(year + '-' + month + '-' + day + ' ' + hour +':' + minute + ':' + second ,'YYYY-MM-DD HH:mm::ss').format('x')
                  }
                }
              }
              counter++
              if(counter == candidatePublicKey.length){
                this.toggleWatchlistBtn(this.pollAddress)
                this.filterResult(candidateAddrVote,candidateAddrName,candidateAddr,whitelistAddr)                
              }
            }, 
            err => console.error(err))
            i++
          },
          err => console.error(err))  
        }
      },
      filterResult(candidateAddrVote,candidateAddrName,candidateAddr,whitelistAddr){
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
        badAddress = this.getDuplicate(badAddress)
        badAddress = this.getUnique(badAddress)

        for(var i = 0; i < candidateAddr.length; i++){
          candidateAddrVote[candidateAddr[i]] = this.removeDuplicates(badAddress,candidateAddrVote[candidateAddr[i]])
        }
        console.log(candidateAddrVote)        
        
        //Private/Whitelist
        if(this.pollData.type == 1){
          this.pollType = 'Private (Whitelist)'
          //Additional filter out non-whitelist address (temporary solution)
          for(var i = 0; i < candidateAddr.length; i++){
            //1) Concat the whitelist addr into the array of voter
            candidateAddrVote[candidateAddr[i]] = candidateAddrVote[candidateAddr[i]].concat(whitelistAddr) 
            //2) Remove all unique value from the array of voter leaving the addresses that match the whitelistAddr
            candidateAddrVote[candidateAddr[i]] = this.getDuplicate(candidateAddrVote[candidateAddr[i]]) 
            //3) Remove the duplicated address
            candidateAddrVote[candidateAddr[i]] = this.getUnique(candidateAddrVote[candidateAddr[i]])
          }
        }else if(this.pollData.type == 0){
          this.pollType = 'Public'
        }

        this.totalVoteCount = 0
        for(var i = 0; i < candidateAddr.length; i++){
          this.totalVoteCount += candidateAddrVote[candidateAddr[i]].length
        }
        
        this.candidateAddrPercentage = '{'

        //TO Keep track of the candidate Percentage with the address 
        for(var v = 0; v < candidateAddr.length; v++){
          if(v > 0){
            this.candidateAddrPercentage = this.candidateAddrPercentage + ',"' + candidateAddr[v] + '":[]'
          }else{
            this.candidateAddrPercentage = this.candidateAddrPercentage + '"' + candidateAddr[v] + '":[]'
          }
        }
        this.candidateAddrPercentage = JSON.parse(this.candidateAddrPercentage + '}')

        if(this.status == "(ONGOING)"){
          for(var i = 0; i < candidateAddr.length; i++){
              if(candidateAddrVote[candidateAddr[i]].length > 0){
                this.candidateAddrPercentage[candidateAddr[i]] = ((candidateAddrVote[candidateAddr[i]].length / this.totalVoteCount) * 100).toFixed(2)            
              }else{
                this.candidateAddrPercentage[candidateAddr[i]] = 0
              }
          }
        }else if(this.status =="(EXPIRED)"){
          for(var i = 0; i < candidateAddr.length; i++){
            if(candidateAddrVote[candidateAddr[i]].length > 0){
              this.candidateAddrPercentage[candidateAddr[i]] = ((candidateAddrVote[candidateAddr[i]].length / this.totalVoteCount) * 100).toFixed(2)
            }else{
              this.candidateAddrPercentage[candidateAddr[i]] = 0
            }
          }
        }
        this.candidateAddr = candidateAddr
        this.candidateAddrName = candidateAddrName
        this.candidateAddrVote = candidateAddrVote
        this.pollInput = ''
                
        // console.log(this.candidateAddr)
        // console.log(this.candidateAddrName)
        // console.log(this.candidateAddrVote)        
        // console.log(this.candidateAddrPercentage)
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
      getDuplicate(array){
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
      onDecode(result){
        console.log("Detected:" + result)
        console.log(result)
        if(result.length == 60 || result.length == 64){
          this.pollInput = result
          this.displayCamera = false
        }else{
          result =JSON.parse(result)
          this.pollInput = result.data.addr
          this.displayCamera = false
        }
      },
      onDecodePrivate(result){
        console.log("Detected Private Key:" + result)
        if(result.length == 64 || result.length == 66){
          this.privateKey = result
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
      pollPublicKeyCheck(){
        if(this.pollInput.length == 60 || this.pollInput.length == 64){
          this.pollInputErr = ''
          return 2
        }else if(this.pollInput.length == 40){          
          this.pollInputErr = ''
          return 1
        }else if(this.pollInput.length < 1){
          this.pollInputErr = 'Search input cannot be empty!'
          this.displayResult = false
          return false
        }else{
          this.pollInputErr = 'You have entered an invalid poll public key/poll public address!'
          this.displayResult = false
          return false
        }
      },
      privateKeyCheck(){
        if(this.privateKey.length == 64 || this.privateKey.length == 66){
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
section{
  min-height:100vh;
}
/* Error msg text */
.text-error{
  padding-top: 5px;
  color: #fa4848;
  margin: 0 0 7px 0;
  font-size: 12px;
  max-width: 100%;
}
#pollResultDiv{
  padding-top:40px;
}
</style>
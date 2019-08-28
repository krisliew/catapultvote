<template>
<!-- This page is just a demo page, currently a duplicate of pollcreated.vue 

TO-DO for update: 
1) add /users/getvotedpoll endpoint to express server

-->
<div>
  <navigation/>
  <section>
    <header class="bg-primary text-white">
      <div class="container text-center">
        <h1>Catapult Vote Modules</h1>
        <h3>- Poll Voted -</h3>
      </div>
    </header>
    <div class="container text-center">
      <div class="row">
          <mdb-datatable
            :data="tableData"
            striped
            bordered
            responsive
            autoWidth
          />
      </div>
    </div>  
  </section>
</div>
</template>

<script>
  import Navigation from '../navigationbar'
  import axios from 'axios'
  import router from '../../router'
  import jwtDecode from 'jwt-decode'
  import moment from 'moment'
  import { mdbDatatable } from 'mdbvue'
  import { 
    AccountHttp,Address,PublicAccount,QueryParams,NetworkType
  } from 'nem2-sdk'


  export default {
    name: 'PollCreated',
    components: {
      'Navigation':Navigation,
      mdbDatatable
    },
    data() {
      return {
        catapultNodeServer:'http://54.169.58.18:3000',
        publicAddrList:[],
        publicKeyList:[],
        rowCounter:1,
        tableData:{
          columns: [
            {
              label: '#',
              field: 'index',
              sort: 'asc'
            },
            {
              label: 'Poll Title',
              field: 'title',
              sort: 'asc'
            },
            {
              label: 'Poll Address',
              field: 'publicAddr',
              sort: 'asc'
            },
            {
              label: 'End Date',
              field: 'endDate',
              sort: 'asc'
            },
            {
              label: 'Status',
              field: 'status',
              sort: 'asc'
            }
          ],
          rows: []
        }
      }
    },
    mounted(){
      if(!localStorage.usertoken){
        router.push({name: 'Entry' })
      }else if(localStorage.usertoken){        
        var token = jwtDecode(localStorage.usertoken)
        this.$parent.ID = token.ID
        this.getUserPoll(this.$parent.ID)
      }
    },
    methods:{
      getUserPoll(userID){
        var self = this
        axios.get('/users/getcreatedpoll',{
           params:{
                ID: userID
            }
          })
          .then(function (response){
            for(var x = 0; x < response.data.length; x++){
              self.publicAddrList.push(response.data[x].pollindexAddress)              
            }            
          })
          .catch(function (error){
            console.log(error)
          })
          .then(function (){
            console.log(self.publicAddrList)
            if(self.publicAddrList.length > 0){
              self.getPollPublicKey()
            }
          });        
      },
      getPollPublicKey(){
        var counter = 0
        for(var x = 0; x < this.publicAddrList.length; x++){
          const accountHttp = new AccountHttp(this.catapultNodeServer)
          var address = Address.createFromRawAddress(this.publicAddrList[x])
          
          accountHttp.getAccountInfo(address).subscribe(accountInfo => {
             this.publicKeyList.push(accountInfo.publicKey)
             counter++
             if(counter == x){
               this.getPollInfo()
             }
          },err => console.error(err));
        }

      },
      getPollInfo(){
        for(var z = 0; z < this.publicKeyList.length; z++){
          const accountHttp = new AccountHttp(this.catapultNodeServer)
          var publicAccount =  PublicAccount.createFromPublicKey(this.publicKeyList[z], NetworkType.MIJIN_TEST)
          var pageSize = 100 // 10 - 100 range page size        
          accountHttp.transactions(publicAccount, new QueryParams(pageSize)).subscribe(result =>{
            console.log(result)
            for(var i = 0; i < result.length; i++){
              if(result[i].type == 16705){ //Confirm that this index is an aggregate TX            
                for(var x = 0; x < result[i].innerTransactions.length; x++){
                    if((result[i].innerTransactions[x].message.payload.substring(0, 2)) == 'po'){                    
                      var pollData = (JSON.parse((result[i].innerTransactions[x].message.payload).substring(9)))
                      var publicAddress = result[i].innerTransactions[x].recipient.address
                      var statusConfirm = "EXPIRED"
                      
                      if(parseInt(pollData.doe) > moment().format('x')){
                        statusConfirm = "ONGOING"
                      }

                      this.tableData.rows.push({
                        index: this.rowCounter,
                        title: pollData.t,
                        publicAddr: publicAddress,
                        endDate: moment(pollData.doe).format('DD/MM/YYYY') + ' at ' + moment(pollData.doe).format('hh:mm a'),
                        status: statusConfirm
                      })
                      this.rowCounter++
                    }
                }
              }
            }
          }, err => console.error(err))
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
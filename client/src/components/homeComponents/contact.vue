<template>
  <section id="contact">
    <div id="contactSeparator">
      <h5>
          We welcome enquiries and suggestion for improvement from everyone!
      </h5>  
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2>Contact us</h2>
          <p class="lead">Please field in all * field below</p>
          <form class="enquiry-form" @submit.prevent="onSubmit">
            <p>
              <input id="name" v-model="name" placeholder="Your Name *"  >
            </p>
            <p>
              <input id="email" type="email" v-model="email" placeholder="Your Email *"  >
            </p>
            <p>
              <select id="enquiryType" v-model.number="enquiryType">
                <option v-for="et in enquiryTypes" :key="et.id" :value="et.id"> {{ et.option }}</option>
              </select>
            </p>
            <p>
              <textarea id="message" v-model="message" placeholder="Your Message*" ></textarea>
            </p>   
            <p id="errorMSG" v-if="errors.length" >
              <b>Please correct the following error(s):</b>
              <ul>
             <li v-for="error in errors" :key="error"> {{ error }}</li>
             </ul>
            </p> 
            <p>
              <input type="submit" value="Submit">  
            </p>
            </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
        name: null,
        email: null,
        message: null,
        enquiry: null,
        enquiryType: 0,
        enquiryTypes:[
          {
            id:0,
            option:"Select a specific enquiry *"
          },
          {
            id:1,
            option:"Business"
          },
          {
            id:2,
            option:"Service/Technical Helpdesk"
          },
          {
            id:3,
            option:"Improvement"
          },
          {
            id:4,
            option:"Others"
          },          
        ],
        errors: []
    }
  },
  methods:{
      onSubmit(){
          this.errors = []
          if(this.name && this.email && this.message && this.enquiryType != 0){
              let enquireSubmit = {
                name: this.name,
                email: this.email,
                message: this.message,
                enquiry: this.enquiryType
              }              
              this.$emit('review-submitted', enquireSubmit)
              this.name = null
              this.email = null
              this.message = null
              this.enquiryType = 0
          }else{
              if(!this.name) this.errors.push("Name required")
              if(!this.email) this.errors.push("Email required")
              if(this.enquiryType == 0) this.errors.push("Specific enquiry required")   
              if(!this.message) this.errors.push("Message required")                       
          }
      }
  }
}</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*-----------Contact Us Section---------------*/
#contactSeparator{
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: rgba(0,0,41,0.9);
    color: white;
    text-align:center;
}
#contact .row{
  text-align:center;
  margin-left:auto;
  margin-right:auto;  
}
#contact input,#contact textarea,#contact select {
  min-width:250px;
  width:90%;
  max-width:500px;
  height:50px;
  text-indent:10px;
}
#contact textarea{
  height:200px;
}
#contact input[type=submit]{
  width:150px;
  text-indent:0px;
}
#errorMSG{
  color:red;
  margin-left:auto;
  margin-right:auto;
  width:300px;
}
#errorMSG li{
  text-align:left;
}
#enquiryType option:first-child{
  display:none;
}
</style>
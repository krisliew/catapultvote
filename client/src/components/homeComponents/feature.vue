<template>
  <section id="feature" class="bg-light">
  <h2>Key Feature</h2>
    <div class="container">      
      <div class="row">
        <div class="featureRow">
            <div class="circle">
            <img src="../../assets/img/index/easy.png" alt="Avatar" class="featurePic" />
            </div>
            <h3 class="glow">Simple</h3>
            <br />
            <p class="lead mb-0">
                Create your vote in a matter of minutes and get the results you need! 
                As long as your voters are online, they can vote from any device & anywhere.
            </p>
        </div>
        <div class="featureRow">
            <div class="circle">
                <img src="../../assets/img/index/secure.png" alt="Avatar" class="featurePic" />
            </div>
            <h3 class="glow">Secure</h3>
            <br />
            <p class="lead mb-0">With the structure of blockchain-technology, no transaction can be tempered and providing unbiased results based on the way a vote should be.
            </p>
        </div>
        <div class="featureRow">
            <div class="circle">
                <img src="../../assets/img/index/reliable.png" alt="Avatar" class="featurePic" />
            </div>
            <h3 class="glow">Reliable</h3>
            <br />
            <p class="lead mb-0">
                All voting results are calculated and displayed to ensure that there is no mistake in any of the vote to give you the outcome that you need.
            </p>
        </div>
      </div>
      <div class="row">
        <div class="featureRow">
            <div class="circle">
                <img src="../../assets/img/index/immutable.png" alt="Avatar" class="featurePic" />
            </div>
            <h3 class="glow">Immutable</h3>
            <br/>
            <p class="lead mb-0">								
                    The votes casted cannot be modified as the blockchain with form a meaningful connection with 
                    one block to another, any modification done will affect the chain will be voided.
            </p>
        </div>
        <div class="featureRow">
            <div class="circle">
                <img src="../../assets/img/index/transparent.png" alt="Avatar" class="featurePic" />
            </div>
            <h3 class="glow">Transparent</h3>
            <br />
            <p class="lead mb-0">
                Anyone eligible are able to see the results as the voting results can be viewed by the public on the Blockchain.
            </p>
        </div>
        <div class="featureRow">
            <div class="circle">
                <img src="../../assets/img/index/decentralise.png" alt="Avatar"  class="featurePic" />
            </div>
            <h3 class="glow">Decentralized</h3>
            <br />
            <p class="lead mb-0">
                Your poll data are stored on blockchain distributed to multiple nodes. Thus, your poll can be viewed 24/7 with zero down time.
            </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Feature',
  data () {
    return {
    }
  }
}</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*------- Key Feature Section---------*/
.featurePic{
   display:inline-block;
    width:60px;
    height:auto;
    margin: 10px;
}
.glow, .circle{
    text-align:center;
}
.glow{
    margin-top:10px;
	font-size: 18px;
	color: #384047;
	-webkit-animation: glow 1s ease-in-out infinite alternate;
	-moz-animation: glow 1s ease-in-out infinite alternate;
	animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 4px #fff;
  }  
  to {
    text-shadow: 0 0 15px #ff8c00;
  }
}
.circle {
    margin-top:20px;
	margin-left:auto;
	margin-right:auto;
	display:block;
	height: 90px;
	width: 90px;
	border-radius: 50%;
	border-color: #000080;
	border-style: solid;
	border-width: 2px;
	text-align: center;
    background: #fff;
    line-height: 1.7em;
}
.circle img{
	display:inline-block; 

}
.featureRow{
    max-width:300px;
    display:inline-block;
    margin-left: auto;
    margin-right: auto;
}
.featureRow p{
    font-size:1.2em;
    text-align:justify;
}
@media (max-width:991px){
    .featureRow{
        max-width:80%;
    }
}
</style>
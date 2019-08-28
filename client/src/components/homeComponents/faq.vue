<template>
 <!-- REF: https://codepen.io/dar-o-t-villena/pen/vbMQLR?&page=1  -->
  <section id="faq" class="bg-light">
      <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2>Frequently Asked Question</h2>
          <div class="accordion">
            <div class="accordion-item">
              <a>What is Catapult Vote?</a>
              <div class="content">
                <p> Catapult Vote is a blockchain voting system that allows anyone to create their own poll/election.</p>
              </div>
            </div>
            <div class="accordion-item">
              <a>What is Blockchain?</a>
              <div class="content">
                <p>
                  Blockchain is a growing list of records, called blocks, which are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data.
                  <br /><br />
                  By design, a blockchain is resistant to modification of the data. It is "an open, distributed ledger that can record transactions between two parties efficiently and in a verifiable and permanent way". For use as a distributed ledger, a blockchain is typically managed by a peer-to-peer network collectively adhering to a protocol for inter-node communication and validating new blocks.
                  <br /><br />
                  Once recorded, the data in any given block cannot be altered retroactively without alteration of all subsequent blocks, which requires consensus of the network majority. Although blockchain records are not unalterable, blockchains may be considered secure by design and exemplify a distributed computing system with high Byzantine fault tolerance. Decentralized consensus has therefore been claimed with a blockchain.
                </p>
              </div>
            </div>
            <div class="accordion-item">
              <a>What can I do with Catapult Vote?</a>
              <div class="content">
                <p>
                  You can create your own poll, bookmark polls that you wish to review and vote for polls.
                </p>
              </div>
            </div>
            <div class="accordion-item">
              <a>How is Catapult Vote different from the others?</a>
              <div class="content">
                <p>
                  The poll data and result are stored in multiple node/server rather than a single centralised server which prevent the tampering of poll result.
                </p>
              </div>
            </div>
            <div class="accordion-item">
              <a>Are the votes anonymous?</a>
              <div class="content">
                <p>
                  Yes, all the votes will be present with the public address of the voters for traceability.
                </p>
              </div>
            </div>
            <div class="accordion-item">
              <a>Where can I get the Public Address when I am registering?</a>
              <div class="content">
                <p>
                  You can either click the link right above the Public Address field to 
				generate your very own public address or use your existing public address that you already have.
                </p>
              </div>
            </div>
            <div class="accordion-item">
              <a>How many times can I vote in a poll?</a>
              <div class="content">
                <p>
                  Catapult Vote only allows 1 vote to be placed on 1 poll, and no multiple votes are available
                </p>
              </div>
            </div>
            <div class="accordion-item">
              <a>How do voters place their vote?</a>
              <div class="content">
                <p>
                  Voters can login with their account and search for the polls. Once the voter selects 
                  a particular poll, the user can then place their vote by clicking the “Vote” button 
                  that is placed by the candidate details.
                </p>
              </div>
            </div>
            <div class="accordion-item">
              <a>Can I delete my polls?</a>
              <div class="content">
                <p>
                  It is not possible as the polls and records in the blockchain are immutable thus they cannot be modified or removed in any way.
                </p>
              </div>
            </div>
            <div class="accordion-item">
              <a>When can we see the results of the poll?</a>
              <div class="content">
                <p>
                 The results of the poll are updated in real- time as they are retrieved from the blockchain directly when you wish to see them.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Faq',
  data () {
    return {
    }
  },
  mounted(){
    //FOR FAQ Click
  const items = document.querySelectorAll(".accordion a");

  function toggleAccordion(){
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('active');
  }
  items.forEach(item => item.addEventListener('click', toggleAccordion));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Hind:300,400');

*, *:before, *:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}
h3 {
  font-size: 1.75rem;
  color: #373d51;
  padding: 1.3rem;
  margin: 0;
}

.accordion a {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  color: #7288a2;
  font-size: 1.15rem;
  font-weight: 400;
  border-bottom: 1px solid #e5e5e5;
}

.accordion a:hover,
.accordion a:hover::after {
  cursor: pointer;
  color: #03b5d2;
}

.accordion a:hover::after {
  border: 1px solid #03b5d2;
}

.accordion a.active {
  color: #03b5d2;
  border-bottom: 1px solid #03b5d2;
}

.accordion a::after {
  font-family: 'Ionicons';
  content: '\f218';
  position: absolute;
  float: right;
  right: 1rem;
  font-size: 1rem;
  color: #7288a2;
  padding: 5px;
  width: 30px;
  height: 30px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 1px solid #7288a2;
  text-align: center;
}

.accordion a.active::after {
  font-family: 'Ionicons';
  content: '\f209';
  color: #03b5d2;
  border: 1px solid #03b5d2;
}

.accordion .content {
  opacity: 0;
  padding: 0 1rem;
  max-height: 0;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
  clear: both;
  -webkit-transition: all 0.2s ease 0.15s;
  -o-transition: all 0.2s ease 0.15s;
  transition: all 0.2s ease 0.15s;
}

.accordion .content p {
  font-size: 1rem;
  font-weight: 300;
  text-align:justify;
}

.accordion .content.active {
  opacity: 1;
  padding: 1rem;
  max-height: 100%;
  -webkit-transition: all 0.35s ease 0.15s;
  -o-transition: all 0.35s ease 0.15s;
  transition: all 0.35s ease 0.15s;
}
</style>
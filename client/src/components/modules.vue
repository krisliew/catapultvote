<template>
  <div>
    <Navigation />
    <section id="modules" >
      <header class="bg-primary text-white">
          <div class="container text-center">
              <h1>Catapult Vote Modules</h1> <br /><br />
              <div class="row">
                  <a href="/createpoll" class="column">
                      <div class="card">
                          <h3>Create</h3>
                          <p>Create a poll on NEM Catapult Blockchain</p>
                      </div>
                  </a>             
                  <a href="/result" class="column">
                      <div class="card">
                          <h3>Search Poll</h3>
                          <p>Observe or vote for a poll</p>
                      </div>
                  </a>
                  <a href="#" class="column">
                      <div class="card">
                          <h3>Poll History</h3>
                            <a href="/pollcreated">Poll Created</a>
                            <a href="/pollvoted">Poll Voted</a>
                            <a href="/pollwatchlist">Watch list</a>
                          <p></p>
                      </div>
                  </a>
              </div>
          </div>
      </header>
        <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <h2>Not sure how to voting modules work?</h2>
            <p class="lead">
                This voting system is powered by <a target="_blank" rel="noreferrer" href="https://nem.io/catapult/">NEM 2 Catapult Blockchain</a>.
                Click <a href="/#guide">here </a> to learn more about the voting system process or you may <a href="/#contact">contact us</a> for any further enquiries!
              </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Navigation from './navigationbar'
  export default {
    name: 'Modules',
    components: {
      'Navigation':Navigation
    },
    data() {
      return {
      }
    },
    mounted(){
      
    }
  }
</script>
<style scoped>
header{
    padding: 156px 0 100px;
    height: 100vh;
    /* background:linear-gradient(rgba(0, 0, 12, 0.7),rgba(0, 0, 0, 0.7) ),url(../assets/img/airport.jpg); */
    background-image: url(../assets/img/zacong.jpg);
    background-size: cover;
    background-repeat:no-repeat;
}

/* Float four columns side by side */
.column {
    color:black;
    margin: 0 auto;
    width: 33%;
    padding: 0 10px;
    text-decoration-line: none;
}
.column:hover{
    padding: 8px;    
    transition-duration: 0.61s;
}
/* Remove extra left and right margins, due to padding in columns */
.row {margin: 0 -5px;}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  padding: 16px;
  background-color: #f1f1f1;
}

/* Responsive columns - one column layout (vertical) on small screens */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}
</style>
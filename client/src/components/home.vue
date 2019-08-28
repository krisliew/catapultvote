<template>
  <div>
    <Navigation />
    <div class="Home">
      <header class="bg-primary text-white">
        <div class="container text-center">
          <h1>Catapult Vote</h1>
          <p class="lead"><b>Catapult – A new generation Blockchain Voting System</b></p>
          <br /> <br />
          <a class="btn btn-primary waves-effect border-0 btn-lg js-scroll-trigger" href="#about">Read More</a> &nbsp &nbsp &nbsp
          <a class="btn btn-white waves-effect btn-lg border-white text-white" href="/entry">Register Now</a>
        </div>
      </header>
      <About />
      <Feature />
      <Guide />
      <Contact />
      <Faq />
    </div>
  </div>
</template>

<script>
import Navigation from './navigationbar'
import About from './homeComponents/about'
import Feature from './homeComponents/feature'
import Guide from './homeComponents/guide'
import Contact from './homeComponents/contact'
import Faq from './homeComponents/faq'

  export default {
    name: 'Home',
    components: {
      'Navigation':Navigation,
      'About': About,
      'Feature':Feature,
      'Guide':Guide,
      'Contact':Contact,
      'Faq':Faq
    },
    data() {
      return {
      }
    },
    mounted(){
      var theAnchor = [];
      theAnchor.push(document.getElementById("homeNav"));
      theAnchor.push(document.getElementById("aboutNav"));
      theAnchor.push(document.getElementById("featureNav"));
      theAnchor.push(document.getElementById("guideNav"));
      theAnchor.push(document.getElementById("contactNav"));
            
      theAnchor[0].href = "#page-top";
      theAnchor[1].href = "#about";
      theAnchor[2].href = "#feature";
      theAnchor[3].href = "#guide";
      theAnchor[4].href = "#contact";
    }
  }
</script>

<style scoped>
header{
  padding: 156px 0 100px;
  height: 100vh;
  background-image: url(../assets/img/index/header.jpg);
  background-size: cover;
  background-repeat:no-repeat;
}
</style>



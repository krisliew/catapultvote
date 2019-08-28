<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="/#page-top"><img height="43px" src="../assets/img/logo.jpg"/></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a :class="homeClass" id="homeNav" :href="homehref">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" id="aboutNav" :href="abouthref">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" id="featureNav" :href="featurehref">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" id="guideNav" :href="guidehref">Guide</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" id="contactNav" :href="contacthref">Contact</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" id="faqNav" :href="faqhref">Q&A</a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
              role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                More
              </a>
              <div class="dropdown-menu dark" aria-labelledby="navbarDropdown" id="moduleNav">                
                <a class="nav-link js-scroll-trigger" href="/modules">Modules</a>                
                <a v-if="this.$parent.$parent.ID" class="nav-link js-scroll-trigger" id="dashboardNav" href="/dashboard">Dashboard</a>                               
                <!-- <a class="dropdown-item" id="moduleNav" :href="moduleshref">Modules</a> Original-->
                <!-- <div class="dropdown-divider"></div> -->
                </div>
            </li>              
            <li v-if="!this.$parent.$parent.ID" class="nav-item">
              <a class="nav-link js-scroll-trigger" id="loginNav" href="/entry">Login</a>
            </li>
            <li v-if="this.$parent.$parent.ID" class="nav-item">
              <a class="nav-link js-scroll-trigger" v-on:click="this.$parent.$parent.logout" href="/">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
import EventBus from './EventBus'

export default {
  name: 'Navigation',
  data () {
    return { 
      homehref:"#page-top",
      homeClass: "nav-link js-scroll-trigger active",
      abouthref:"#about",
      featurehref:"#feature",
      guidehref:"#guide",
      contacthref:"#contact",
      faqhref: "#faq"
    }
  },
  mounted(){
    console.log("navigationbar.vue => Current Route: " + this.$route.path)
    if(this.$route.path != '/'){
      this.homeClass = "nav-link js-scroll-trigger"
      this.homehref = "/" + this.homehref
      this.abouthref = "/" + this.abouthref
      this.featurehref = "/" + this.featurehref
      this.guidehref = "/" + this.guidehref
      this.contacthref = "/" + this.contacthref
      this.faqhref = "/" + this.faqhref
    }
    
    if($(window).scrollTop()>100)
      $("#mainNav").css({"background-color" : "rgba(0, 0, 31, 0.9)"});

    $(window).scroll(function(){
      if($(window).scrollTop()>100)
        $("#mainNav").css({"background-color" : "rgba(0, 0, 31, 0.9)"});
      else
        $("#mainNav").css({"background-color" : "rgba(0, 0, 31,0)"});
    });

   (function($) {
      "use strict"; // Start of use strict

      // Smooth scrolling using jQuery easing
      $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: (target.offset().top - 56)
            }, 1000, "easeInOutExpo");
            return false;
          }
        }
      });

      // Closes responsive menu when a scroll trigger link is clicked
      $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');          
      });

      // Activate scrollspy to add active class to navbar items on scroll
      $('body').scrollspy({
        target: '#mainNav',
        offset: 57 //Original is 56 ** delete ltr**
      });
    })(jQuery); // End of use strict    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#navbarResponsive ul li a{
    font-size: 20px;
}
.dropdown-menu a{
  color:black !important;
  font-size:20px !important;
}
.dropdown-menu{
  font-size:20px !important;
}
</style>

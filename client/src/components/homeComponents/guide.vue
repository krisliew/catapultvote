<template>
  <section id="guide">
      <h2>Guide</h2>
      <div class="container-voting-process">
		<ol class="step-list">
            <li class="step-list__item">
                <div class="step-list__item__inner">
                    <div class="content">
                        <div id="step1d" class="body">
                            <a><h2>Create Your Poll</h2></a>
                            <p>Create and customize your poll by filling in the form created by us so that your vote can be created hassle- free!
                            <br><br>
                            Set your poll title, description, voting options voting period to get your vote ready to go.
                            </p>
                        </div>

                        <div class="icon">
                            <img src="https://pngimage.net/wp-content/uploads/2018/05/create-icon-png-2.png" alt="Check">
                        </div>                
                    </div>
                </div>
            </li>
            <li class="step-list__item">
                <div class="step-list__item__inner">
                    <div class="content">
                        <div id="step2d" class="body">
                            <a><h2>View Created and Bookmarked Poll</h2></a>
                            <p>Once you have created your poll, you can view your history of polls created as well as any polls that you bookmarked so you can always view them whenever you need.
                            </p>
                        </div>

                        <div class="icon">
                            <img src="https://image.flaticon.com/icons/png/512/27/27630.png" alt="Check">
                        </div>                
                    </div>
                </div>
            </li>

            <li class="step-list__item">
                <div class="step-list__item__inner">
                    <div class="content">
                        <div id="step3d" class="body">
                            <a><h2>Vote!</h2></a>
                            <p> And just like that, voters can easily do their part in your voting process.
                                Each voter can only have 1 chance to vote to ensure high accuracy in the polling result. 
                               
                            </p>
                        </div>

                        <div class="icon">
                            <img src="https://cdn.onlinewebfonts.com/svg/img_532042.png" alt="Check">
                        </div>                
                    </div>
                </div>
            </li>
            <li class="step-list__item">
                <div class="step-list__item__inner">
                    <div class="content">
                        <div id="step4d" class="body">
                            <a><h2>View the Results</h2></a>
                            <p> The poll results are updated real-time so that you can enjoy seeing the latest update on your voting results.
                            <br>
                            <br>
                            You can get to see the percentages as well as the chart representation of the results to get a better idea of the overall happenings in your poll.
                            </p>
                        </div>

                        <div class="icon">
                            <img src="https://pngimage.net/wp-content/uploads/2018/06/result-icon-png-1.png" alt="Check">
                        </div>                
                    </div>
                </div>
            </li>
        </ol>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Guide',
  data () {
    return {
    }
  }
}</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-voting-process {
  box-sizing: border-box;
}
.container-voting-process {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 100%;
  line-height: 1.5;
}
.container-voting-process {
  font-size: inherit;
  line-height: inherit;
}
.container-voting-process {
  box-sizing: content-box;
  padding: 0 12px;
  max-width: 640px;
  margin: 48px auto;
}
.step-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.step-list__item {
  counter-increment: step-counter;
  position: relative;
}
.step-list__item:before {
  content: counter(step-counter);
  font-weight: 300;
  color: #d8d8d8;
}
.step-list__item h2 {
  font-size: 24px;
  line-height: 30px;
  font-weight: 700; 
}
.step-list__item p {
  font-size: 18px;
  line-height: 30px;
  font-weight: 500; 
}
.step-list__item .icon {
  border-radius: 50%;
  display: block;
  flex: 0 0 auto;
}
.step-list__item .icon img {
  width: 100%;
  height: 100%;
}
.step-list__item .body {
  font-size: 12px;
  line-height: 18px;
  font-weight: 300;
}
.step-list__item .content {
  display: flex;
  flex-direction: row;
  padding-bottom: 18px;
}
.step-list__item:first-child .icon {
  background: #f4f6d5;
}
.step-list__item:nth-child(2) .icon {
  background: #e8f4f3;
}
.step-list__item:nth-child(3) .icon {
  background: #ededed;
}
.step-list__item:nth-child(4) .icon {
  background: #edf6ef;
}
.step-list__item:nth-child(5) .icon {
  background: #fef3f3;
}
.step-list__item:nth-child(odd) .content {
  justify-content: flex-start;
}
.step-list__item:nth-child(even) .content {
  justify-content: flex-end;
}
.step-list__item:first-child > .step-list__item__inner:before {
  content: none;
}
.step-list__item:last-child > .step-list__item__inner:after {
  content: none;
}
.step-list__item + li {
  margin-top: 84px;
}
.step-list__item + li > div {
  margin-top: -1px;
}
@media screen and (max-width: 600px) {
  .step-list__item {
    display: flex;
  }
  .step-list__item:before {
    content: counter(step-counter);
    position: relative;
    font-size: 30px;
    line-height: 42px;
    font-weight: 300;
    color: #000000;
    margin-right: 12px;
  }
  .step-list__item .icon {
    order: 0;
    width: 36px;
    height: 36px;
    padding: 9px;
    position: absolute;
    left: -9px;
    top: 42px;
  }
  .step-list__item .body {
    order: 1;
    margin-top: 8px;
    margin-left: 12px;
  }
  .step-list__item .content {
    align-items: flex-start;
  }
  .step-list__item .content:before {
    content: '';
    position: absolute;
    border-left: #d8d8d8;
    height: 100%;
    left: 9px;
    bottom: 0;
    display: block;
    width: 1px;
    background: #d8d8d8;
    top: 84px;
  }
  .step-list__item:last-child .content:before {
    content: none;
  }
}
@media screen and (min-width: 601px) {
  .step-list__item:before {
	content: "STEP " counter(step-counter); /*   https://www.w3schools.com/cssref/pr_gen_counter-increment.asp    */
    position: absolute;
    font-size: 52px;
    line-height: 1;
    font-weight: 300;
    color: #8c8c8c;
  }
  .step-list__item .icon {
    width: 174px;
    height: 174px;
    padding: 48px;
  }
  .step-list__item .body {
    margin-top: 60px;
  }
  .step-list__item .content {
    align-items: flex-end;
  }
  .step-list__item > .step-list__item__inner {
    position: relative;
  }
  .step-list__item > .step-list__item__inner:before, .step-list__item > .step-list__item__inner:after {
    border-width: 0px;
    border-style: solid;
    border-color: #363636;
    display: block;
    content: '';
    position: absolute;
    height: 42px;
    width: calc( 33.3333% - 42px );
  }
  .step-list__item:nth-child(odd) > .step-list__item__inner {
    text-align: left;
  }
  .step-list__item:nth-child(odd) > .step-list__item__inner:before, .step-list__item:nth-child(odd) > .step-list__item__inner:after {
    border-left-width: 1px;
    left: calc( 33.3333% - 21px );
  }
  .step-list__item:nth-child(odd) > .step-list__item__inner:before {
    border-top-width: 1px;
    border-top-left-radius: 42px;
    margin-top: -42px;
  }
  .step-list__item:nth-child(odd) > .step-list__item__inner:after {
    border-bottom-width: 1px;
    border-bottom-left-radius: 42px;
    margin-bottom: -42px;
  }
  .step-list__item:nth-child(odd):before {
    left: 0;
    margin-left: 33.3333%;
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
  }
  .step-list__item:nth-child(odd) .icon {
    margin-left: 72px;
  }
  .step-list__item:nth-child(even) > .step-list__item__inner:before, .step-list__item:nth-child(even) > .step-list__item__inner:after {
    border-right-width: 1px;
    right: calc( 33.3333% - 21px );
  }
  .step-list__item:nth-child(even) > .step-list__item__inner:before {
    border-top-width: 1px;
    border-top-right-radius: 42px;
    margin-top: -42px;
  }
  .step-list__item:nth-child(even) > .step-list__item__inner:after {
    border-bottom-width: 1px;
    border-bottom-right-radius: 42px;
    margin-bottom: -42px;
  }
  .step-list__item:nth-child(even):before {
    right: 0;
    margin-right: 33.3333%;
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
  }
  .step-list__item:nth-child(even) .icon {
    margin-right: 72px;
  }
  .step-list__item:nth-child(even) .body {
    order: 1;
  }
}

</style>
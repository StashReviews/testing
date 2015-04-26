<ul class="three_column">
  <a href="#"><li>
    <img src="http://i.imgur.com/0xqsnEO.png" alt="Dispensary Icon"/>
    <h1 class="dispensariestitle">FIND DISPENSARIES</h1>
    <p>Find recreational cannabis dispensaries in your area. Explore up-to-date menus with prices for every dispensary listed on DeViine. Browse through user reviews, images, store locations, store hours and contact information to find the best dispensary for you.</p>
  </li></a>
  <a href="#"><li>
    <img src="http://i.imgur.com/818RACi.png" alt="Deal Icon"/>
    <h1 class="dealstitle">DISCOVER DEALS</h1>
    <p>Discover the best deals in your area. We work directly with businesses within the recreational cannabis industry to provide the best deals possible. Find deals on strains, edibles, concentrates, glassware, rolling papers and other accessories from businesses in your area.</p>
  </li></a>
  <a href="#"><li class="omega">
    <img src="http://i.imgur.com/iC4LzsB.png" alt="Strain Icon"/>
    <h1 class="strainstitle">EXPLORE STRAINS</h1>
    <p>Explore through our ever-expanding strain database to find the perfect strain for you. All cannabis strains provide different highs, flavor profiles and effects. We work directly with licensed producers to provide the most comprehensive database possible.</p>
  </li></a>
</ul>
<!-- end slide -->




<!--TAKE THIS SECTION AND USE PHP CODE TO DYNAMICALLY PULL IN CONTENT
         <div class="directorySlider"></div-->



<div id="page_wrapper">
<!--TAKE THIS SECTION AND USE PHP CODE TO DYNAMICALLY PULL IN CONTENT 
WILL NEED TO CALL IN AN HREF FOR EVERY DISPENSARY THAT IS ADDED
WILL NEED TO CALL IN THE IMAGE FOR SAID DISPENSARY
WILL NEED TO USE SPECIAL CODE FOR THE LOCATION INFORMATION AND CALL IN THE ADDRESS INTO CLASSES INSIDE OF H2
WILL NEED TO CALL IN THE RATING WITH SPECIAL CODE
WILL NEED TO CREATE AND POPULATE NEW LI's INSIDE OF CLASS="BUD"
WILL NEED TO CALL IN SPECIAL CODE FOR CLASS="RATINGTEXT"
WILL NEED TO CALL IN OUTPUTS FROM SPECIAL CODE FOR THE CLASS="DISTANCE" -->
      <section class="featureddispensaries">
        <h2 class="featdispbar">Featured Dispensaries</h2>
        <div class="featureddispensariesbody">

          <?php include_once ('../lib/dispensaries_script.php');?>
          
        </div>
      </section>
        







<!--WILL NEED TO CALL IN DEAL TITLE FROM TXT FILE
CALLING IN DEAL CONTENT FORM TXT FILE
CALLING IN BUSINESS NAME FROM TXT FILE
WILL NEED TO USE SPECIAL CODE FOR THE LOCATION INFORMATION - FOR 'MILES AWAY'
USING SPECIAL CODE TO COUNT DOWN ON TIME LEFT BEFORE DEAL EXPIRATION -->
     <section id="dailydeals">
          <a href="html/deals.html"><h2 class="dailydealsbar">Daily Deals</h2></a>
          <div class="dailydeals">          
			
			<?php include_once ('../lib/deals_script.php');?>
            
          </div>
        </section>



        <section id="sotw">
          <a href="html/deals.html"><h2 class="sotwbar">Strains of the Week</h2></a>
          <div class="sotwbody">
            
            <?php include_once ('../lib/strains_script.php');?>

          </div>
        </section>
</div><!--END WRAPPER-->





      <section id="voting">
        <h2 class="votingbar">Voting</h2>
        <div class="voting">
          <script src="http://assets-polarb-com.a.ssl.fastly.net/assets/polar-embedded.js" async data-publisher="DeVine" data-poll-set="3477"></script>
        </div>
      </section>


<!-- THIS SECTION REQUIRES NO PHP INTEGRATION BUT EVENTUALLY NEEDS TO BE REWRITTEN FOR COMMERCIAL PURPOSE (POST-BETA) -->
        
      <section id="wiyb">
            <h2 class="wiybbar">What's In Your Bowl?</h2>
            <div class="wiyb">
                <div id="disqus_thread"></div>
                  <script type="text/javascript">
                    
                      var disqus_shortname = 'devineco';

                      (function() {
                          var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                          dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                      })();
                  </script>
                  <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
                  <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
    

            </div>
      </section>


<!-- !!!!!!!!!!!!!!THIS SPONSOR SECTION ONLY GOES ON THE HOME PAGE!!!!!!!!!!!!!!!!! -->

      <section id="sponsor">
        <a href="html/advertise.html"><h2 class="sponsorbar">Sponsors</h2></a>
        <ul class="sponsorbackground">
          <li><a href="#"><img src="http://placehold.it/92x92"></a></li>
          <li><a href="#"><img src="http://placehold.it/92x92"></a></li>
          <li><a href="#"><img src="http://placehold.it/92x92"></a></li>
          <li><a href="#"><img src="http://placehold.it/92x92"></a></li>
          <li><a href="#"><img src="http://placehold.it/92x92"></a></li>
          <li><a href="#"><img src="http://placehold.it/92x92"></a></li>
          <li><a href="#"><img src="http://placehold.it/92x92"></a></li>
          <li><a href="#"><img src="http://placehold.it/92x92"></a></li>
        </ul>
      </section>
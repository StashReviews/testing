    <div class="dealinfo">
        <h2 class="infobar">Information</h2>
        <div class="infocontainer">

          <div class="audinfo">
            <h2><?php echo file_get_contents('../lib/deals/deal1/title');?></h2>
            <h3><?php echo file_get_contents('../lib/deals/deal1/business_name');?></h3>
            <h4><?php echo file_get_contents('../lib/deals/deal1/address');?></h4>
            <a href="#" data-reveal-id="mapmodal" class="map">Map &#10095;&#10095;</a>
            <div id="mapmodal" class="reveal-modal medium" data-reveal>
               <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=walking+raven+2001+South+Broadway+Denver,+CO,+80210&amp;aq=&amp;sll=39.68009,-104.987849&amp;sspn=0.006292,0.010128&amp;ie=UTF8&amp;hq=&amp;hnear=&amp;ll=39.68009,-104.987849&amp;spn=0.006295,0.006295&amp;t=m&amp;output=embed"></iframe><br /><small>View <a href="https://maps.google.com/maps?f=q&amp;source=embed&amp;hl=en&amp;geocode=&amp;q=walking+raven+2001+South+Broadway+Denver,+CO,+80210&amp;aq=&amp;sll=39.68009,-104.987849&amp;sspn=0.006292,0.010128&amp;ie=UTF8&amp;hq=&amp;hnear=&amp;ll=39.68009,-104.987849&amp;spn=0.006295,0.006295&amp;t=m" style="text-align:left" target="_blank">Driving Directions</a> in a larger map</small>
              <a class="close-reveal-modal">&#215;</a>
            </div>

            <ul class="overallrating"> 
              <li><img src="../img/budiconyes.png"></li>
              <li><img src="../img/budiconyes.png"></li>
              <li><img src="../img/budiconyes.png"></li>
              <li><img src="../img/budiconyes.png"></li>
              <li><img src="../img/budiconno.png"></li>
              <h4>Rated 4/5 by 453 users</h4>
            </ul>

            <div class="contactinfo">
              <h4><a href="http://mmjdenver.net" target="_blank"><img src="../img/webicon.png"><?php echo file_get_contents('../lib/deals/deal1/website');?></a></h4>
              <h4><a href="mailto:klmanagers@gmail.com"><img src="../img/emailicon.png"><?php echo file_get_contents('../lib/deals/deal1/email_address');?></a></h4>
              <h4><img src="../img/phoneicon.png"><?php echo file_get_contents('../lib/deals/deal1/phone');?></h4>
            </div>

          </div>
        </div>
      </div>




      <div class="images">
        <h2 class="imagesbar">Image</h2>
          <div class="imagesbody">
              <img src="http://assets.hightimes.com/strain-reviews.jpg">
          </div>
      </div>



    
      
         
      <div class="details">
        <h2 class="detailsbar">Details</h2>
        <div class="detailsbody">
          <div class="buttonwrapper">
            <h2><?php include ('../lib/deals/deal1/days_left.php');?> Days Left</h2>
            <h3>Expires <?php echo file_get_contents('../lib/deals/deal1/end_date');?></h3>
            <button>Get Deal</button>
          </div>
          <h3>The Deal</h3>
          <p>Offering $180 ounces of select strains. The extensive menu offers an array of different flowers. </p>
           <h3>Wellspring Collective</h3>
          <p>Wellspring Collective offers some of the highest quality strains you can buy in Denver. We have a variety of different flowers, edibles, concentrates and much more. We strive to have the best budtenders in the business. Our staff is extremely friendly and willing to help the first-time user or the experienced stoner.</p>
          <h3>The Fine Print</h3>
          <p>Expires May 25th, 2014. Only applies to strains included in the deal. Ask staff for more details. Merchant is solely responsible to purchasers for the care and quality of the advertised goods and services.</p>
          <h3>How to Use</h3>
          <p>Press the 'Get Deal' button. You may print out a copy or just show it to the budtender from your mobile screen.</p>
          <h3>Terms of Use</h3>
          <p>Deals are valid for a limited time only. DeViine reserves the right to modify or cancel deals at any time. The deal applies only to qualifying items displaying the deal offer on the item detail page. The offer will not be valid until it is applied to the qualifying item. The promotion is limited to one deal per customer. If you return any of the items ordered with a deal, the deal discount or value may be subtracted from the return credit. Offer good while supplies last. Void where prohibited. DeViine has no obligation for payment of any tax in conjunction with the distribution or use of any deal. Consumer is required to pay any applicable sales tax related to the use of the deal. Deals are void if restricted or prohibited by law.</p>
        </div>
      </div>



      <div class="reviews">
        <h2 class="reviewsbar">Reviews</h2>
        <div class="reviewsbody">
           <div id="disqus_thread"></div>
              <script type="text/javascript">
                  var disqus_shortname = 'devinewalkingravenreviews';

                  /* * * DON'T EDIT BELOW THIS LINE * * */
                  (function() {
                      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                  })();
              </script>
              <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
              <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
    
        </div>
      </div>




        <section id="otherdeals">
          <a href="html/deals.html"><h2 class="dailydealsbar">Other Deals</h2></a>
          <div class="dailydeals">

            <a href="../html/dealinformation.html" class="cardwrapper">
              <img src="http://placehold.it/183x183" class="cardlogo">
              <h1 class="dealtitle">DEAL TITLE WRAPPING ONTO THE SECOND LINE</h1>
              <h2 class="dealaddress"><span>BUSINESS NAME</span><br>Address Line 1<br>City, State Zipcode</h2>
              <div class="stats">
                <div class="statleft">
                  <h4 class="number">9</h4> 
                  <h5 class="label">MILES<br>AWAY</h5>
                </div>
                <div class="statright">
                  <h4 class="number">6</h4> 
                  <h5 class="label">DAYS<br>LEFT</h5>
                </div>
              </div>
            </a>

            <a href="../html/dealinformation.html" class="cardwrapper">
              <img src="http://placehold.it/183x183" class="cardlogo">
              <h1 class="dealtitle">DEAL TITLE WRAPPING ONTO THE SECOND LINE</h1>
              <h2 class="dealaddress"><span>BUSINESS NAME</span><br>Address Line 1<br>City, State Zipcode</h2>
              <div class="stats">
                <div class="statleft">
                  <h4 class="number">9</h4> 
                  <h5 class="label">MILES<br>AWAY</h5>
                </div>
                <div class="statright">
                  <h4 class="number">6</h4> 
                  <h5 class="label">DAYS<br>LEFT</h5>
                </div>
              </div>
            </a>

            <a href="../html/dealinformation.html" class="cardwrapper">
              <img src="http://placehold.it/183x183" class="cardlogo">
              <h1 class="dealtitle">DEAL TITLE WRAPPING ONTO THE SECOND LINE</h1>
              <h2 class="dealaddress"><span>BUSINESS NAME</span><br>Address Line 1<br>City, State Zipcode</h2>
              <div class="stats">
                <div class="statleft">
                  <h4 class="number">9</h4> 
                  <h5 class="label">MILES<br>AWAY</h5>
                </div>
                <div class="statright">
                  <h4 class="number">6</h4> 
                  <h5 class="label">DAYS<br>LEFT</h5>
                </div>
              </div>
            </a>

            <a href="../html/dealinformation.html" class="cardwrapper">
              <img src="http://placehold.it/183x183" class="cardlogo">
              <h1 class="dealtitle">DEAL TITLE WRAPPING ONTO THE SECOND LINE</h1>
              <h2 class="dealaddress"><span>BUSINESS NAME</span><br>Address Line 1<br>City, State Zipcode</h2>
              <div class="stats">
                <div class="statleft">
                  <h4 class="number">9</h4> 
                  <h5 class="label">MILES<br>AWAY</h5>
                </div>
                <div class="statright">
                  <h4 class="number">6</h4> 
                  <h5 class="label">DAYS<br>LEFT</h5>
                </div>
              </div>
            </a>

          </div>
        </section>

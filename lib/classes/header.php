<!doctype html>
<html class="no-js" lang="en">
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="google-site-verification" content="rf6KXMtOIDZE558PolETgfr0nPJvYKOexogW6unsHfg" />
    <title>DeViine | Lets Save Green</title>
    <!--base target="_blank" href="~/localhost/~justin001vinge/beta/"--> <!--Sets the filepath of all pages to begin at this root. No longer relevent.-->
    <link href="favicon.ico" rel="icon" type="image/x-icon" />
    <!--link rel="stylesheet" href="../src/css/foundation.css" media="screen" /-->
    <link rel="stylesheet" href="../src/css/animate.min.css" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800,300' rel='stylesheet' type='text/css'>
    <!-- Styles CSS -->
    <link rel="stylesheet" href="../src/css/styles.css" media="screen" />

    <!--Search link Node.js for in-site search indexing-->
    <!--script type="text/javascript" src="../src/js/search_node.js"></script-->
    <!--jQuery-->
    <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
    <!--[if lte IE 9] Then this script is required for the donut graph>
    <script src="http:////cdn.jsdelivr.net/excanvas/r3/excanvas.js"></script>
    <![endif]-->  
    <!-- Firebase -->
    <script src='https://cdn.firebase.com/js/client/2.0.2/firebase.js'></script>  
    <!--script src="../src/js/users.js"></script-->   
    </head>
  <body class="home">
    <!-- Firebase ref -->
    <!--p style="font-weight: bold; ">GeoFire data for this example can be found <a id="firebaseRef" href="#" target="_blank">here</a></p-->

    <!-- Message log -->
    <div id="log"></div>
    
    <div class="top"></div>
    <!-- Ratings JS -->
    <script src="../src/js/ratings.js" type="text/javascript" defer></script>
    <script src="../src/js/rating_output.js" type="text/javascript" defer></script>
    <script src="../src/js/dispensary_hours.js" type="text/javascript"></script>
    <script src="../src/js/read_more.js" type="text/javascript"></script>

<header>
      
<a href="index.php?page=page1.php"><img id="logo" src="../img/deviine_logo.png"></a>
<div class="container">
    <!-- turn this into a select to search multiple indexes -->
    <input type="hidden" name="index" value="firebase" />
    <!--Begin search section-->
        <!--section class="search_container">
            <form class="search" method="post" action="index.html" >
            <input type="text" class="form-control" name="q" placeholder="Enter search term"/>
                <button class="searchicon_btn" type="submit">
                    <img class="searchicon_img" src="../img/searchicon.png">
                </button>	 
                <ul class="results" >
                    <h2>Results <span id="total" class="zero">0</span></h2>
                    <li><a href="index.html"><pre id="raw" class="pre-scrollable"></pre><br /><span>Description...</span></a></li>
                </ul>
            </form>
        </section>
    </div--><!--End search section-->
</div>
<!--End search section-->
<!--<ul class="list-inline">
<li><label><input type="radio" name="type" value="user" checked> users</label></li>
<li><label><input type="radio" name="type" value="message"> messages</label></li>
<li class="divider"></li>
<li><label><input type="checkbox" name="words"> whole words</label></li>
</ul>
<p class="help-block">You may use * or ? for wild cards in your search.</p>
</form>
</div-->
<!--End Search Bar-->
        <div class="mobileheaderbuttons">
          <a href="#"><img src="../img/hamburger_button.png"></a>
          <a href="#"><img src="../img/search_button.png"></a>
        </div>
      </header>
      <ul class="nav">
        <li class="dispensaries"><a href="index.php?page=page2.php">Dispensaries</a></li>
        <li class="deals"><a href="index.php?page=page3.php">Deals</a></li>
        <li class="strains"><a href="index.php?page=page4.php">Strains</a></li>
      </ul> 
<!--
    <div id="alertmodal" class="reveal-modal" data-reveal>
      <h1>This page contains content that is intended for adults only.</h1>
      <br><h4>You must be 21 years or older to continue.</h4>
      <div class="agebuttons">
        <br><button class="close-reveal-modal over21">Over 21</button>
        <button href="http://google.com" class="close-reveal-modal notover21">Not Over 21</button>
      </div>
      <br><h6>DISCLAIMER: Please be aware that possessing, using, distributing & selling marijuana are all federal crimes and the articles, pages, links, or any other information on this site are NOT intended to assist you in violating federal law nor will they in any way assist you in complying with federal law. The information on this site is intended as a public resource to stay informed as the legalization process of marijuana continues.<h6>
    </div>   
-->
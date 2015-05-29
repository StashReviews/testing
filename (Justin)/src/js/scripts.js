/*
 $(document).foundation();


 $(document).ready(function() {
 $('input,div,a,img,li,button,select').focus(function() {
 $(this).css('outline-color','#4EF253');
 });
 });
 // Age Alert Modal
 //$('#alertmodal').foundation('reveal', 'open');
 $('.notover21').on('click', function(){
 window.location.href = "http://google.com";
 });



 // Mobile Location Change
 $('.changelocation').click(function(){
 $('.location,.homesubnav').css("display","inline-block");
 $('.mobiledealcards,.mobiledispensarycards,.arrange,.mobileindex').css("display","none");
 });


 // // Nav Icon Color Change
 // $('.homepage').mouseenter(function(){
 // 	$(this).html('<img src="img/homeiconactive.png">Home').css("color","#F7253E");
 // });
 // $('.homepage').mouseleave(function(){
 // 	$(this).html('<img src="img/homeicon.png">Home').css("color","white");
 // });
 // $('.dispensaries').mouseenter(function(){
 // 	$(this).html('<img src="img/dispensariesiconactive.png">Dispensaries').css("color","#4EF253");
 // });
 // $('.dispensaries').mouseleave(function(){
 // 	$(this).html('<img src="img/dispensariesicon.png">Dispensaries').css("color","white");
 // });
 // $('.deals').mouseenter(function(){
 // 	$(this).html('<img src="img/dealsiconactive.png">Deals').css("color","#FCD31C");
 // });
 // $('.deals').mouseleave(function(){
 // 	$(this).html('<img src="img/dealsicon.png">Deals').css("color","white");
 // });
 // $('.strains').mouseenter(function(){
 // 	$(this).html('<img src="img/strainsiconactive.png">Strains').css("color","#4EF253");
 // });
 // $('.strains').mouseleave(function(){
 // 	$(this).html('<img src="img/strainsicon.png">Strains').css("color","white");
 // });
 // $('.news').mouseenter(function(){
 // 	$(this).html('<img src="img/newsiconactive.png">News').css("color","#FCD31C");
 // });
 // $('.news').mouseleave(function(){
 // 	$(this).html('<img src="img/newsicon.png">News').css("color","white");
 // });
 // $('.contactus').mouseenter(function(){
 // 	$(this).html('<img src="img/contacticonactive.png">Contact Us').css("color","#F7253E");
 // });
 // $('.contactus').mouseleave(function(){
 // 	$(this).html('<img src="img/contacticon.png">Contact Us').css("color","white");
 // });


 // // Viewing Content In State
 // $('#LocationColorado').click(function() {
 // 	$('.locationbar').text('Viewing Content In Colorado');
 // 	$('.inwashington').css("display", "none");
 // 	$('.incolorado').css("display", "inline-block");
 // });
 // $('#LocationWashington').click(function() {
 // 	$('.locationbar').text('Viewing Content In Washington');
 // 	$('.incolorado').css("display", "none");
 // 	$('.inwashington').css("display", "inline-block");
 // });


 // Deals Card Animation
 $('.dealcardwrapper').mouseenter(function(){
 $('.dealinfo', this).addClass('dealinfohover');
 });
 $('.dealcardwrapper').mouseleave(function(){
 $('.dealinfo', this).removeClass('dealinfohover');
 });



 // View Button Active
 $('.view').click(function(){
 $('.view').removeClass('active');
 $(this).addClass('active');
 });



 // Sort Button Active
 $('.sortitem').click(function(){
 $('.sortitem').removeClass('active');
 $(this).addClass('active');
 });


 // Unit Button Active
 $('.unit').click(function(){
 $('.unit').removeClass('active');
 $(this).addClass('active');
 });



 // Dispensary Map List Active
 $('.dispensary,.deal').click(function(){
 $(this).addClass('active');
 $('h5',this).css("display","inline-block");
 $('p',this).css("display","inline-block");
 $('button',this).css("display","inline-block");
 });
 $('.viewcards').click(function(){
 $('.map').css("display", "none");
 $('.dispensaries,.deals').css("display", "inline-block");
 });
 $('.viewmap').click(function(){
 $('.dispensaries,.deals').css("display", "none");
 $('.map').css("display", "inline-block");
 });




 // Current Location
 $('.citythumb.seattle').click(function(){
 $('.currentlocation').html('Seattle, WA');
 });
 $('.citythumb.spokane').click(function(){
 $('.currentlocation').html('Spokane, WA');
 });
 $('.citythumb.denver').click(function(){
 $('.currentlocation').html('Denver, CO');
 });
 $('.citythumb.colorado-springs').click(function(){
 $('.currentlocation').html('Colorado-Springs, CO');
 });
 $('#Washington').click(function(){
 $('.currentlocation').html('Washington');
 });
 $('#Colorado').click(function(){
 $('.currentlocation').html('Colorado');
 });


 // Geolocation
 /* Does your browser support geolocation?
 if ("geolocation" in navigator) {
 $('.js-geolocation').show();
 } else {
 $('.js-geolocation').hide();
 }

 /* Geolocation */
/*$('.js-geolocation').on('click', function() {
 navigator.geolocation.getCurrentPosition(function(position) {
 loadLocation(position.coords.latitude+','+position.coords.longitude);
 });

 });

 $(document).ready(function() {
 loadLocation('Spokane',''); //@params location, woeid
 });

 function loadLocation(location, woeid) {
 $.simpleWeather({
 location: location,
 woeid: woeid,
 success: function(location) {
 html = '<h2></h2>';
 html += '<div>'+location.city+', '+location.region+'</div>';

 $("#location").html(html);
 },
 error: function(error) {
 $("#location").html('<p>'+error+'</p>');
 }
 });
 }



 // Rating System
 $('.star1').click(function() {
 var rating = $(this).attr('title');
 console.log(rating);
 });
 $('.star2').click(function() {
 var rating = $(this).attr('title');
 console.log(rating);
 });
 $('.star3').click(function() {
 var rating = $(this).attr('title');
 console.log(rating);
 });
 $('.star4').click(function() {
 var rating = $(this).attr('title');
 console.log(rating);
 });
 $('.star5').click(function() {
 var rating = $(this).attr('title');
 console.log(rating);
 });
 $('.star1').on('mouseenter', function() {
 $('.star1').css("fill", "#2c3034");
 });
 $('.star2').on('mouseenter', function() {
 $('.star1,.star2').css("fill", "#2c3034");
 });
 $('.star3').on('mouseenter', function() {
 $('.star1,.star2,.star3').css("fill", "#2c3034");
 });
 $('.star4').on('mouseenter', function() {
 $('.star1,.star2,.star3,.star4').css("fill", "#2c3034");
 });
 $('.star5').on('mouseenter', function() {
 $('.star1,.star2,.star3,.star4,.star5').css("fill", "#2c3034");
 });
 $('.star1').on('mouseleave', function() {
 $('.star1').css("fill", "rgba(150,150,150,1)");
 });
 $('.star2').on('mouseleave', function() {
 $('.star1,.star2').css("fill", "rgba(150,150,150,1)");
 });
 $('.star3').on('mouseleave', function() {
 $('.star1,.star2,.star3').css("fill", "rgba(150,150,150,1)");
 });
 $('.star4').on('mouseleave', function() {
 $('.star1,.star2,.star3,.star4').css("fill", "rgba(150,150,150,1)");
 });
 $('.star5').on('mouseleave', function() {
 $('.star1,.star2,.star3,.star4,.star5').css("fill", "rgba(150,150,150,1)");
 });



 // Hours Time Checker
 $(function(){
 var currentTime = new Date();
 var currentHour = currentTime.getHours();
 var currentMinute = currentTime.getMinutes();
 var currentDay = currentTime.getDay();
 console.log(currentTime);
 console.log(currentHour);
 console.log(currentMinute);
 console.log(currentDay);

 var mondayopen = $('.mondayopen').attr('Title');
 var mondayclose = $('.mondayclose').attr('Title');
 var tuesdayopen = $('.tuesdayopen').attr('Title');
 var tuesdayclose = $('.tuesdayclose').attr('Title');
 var wednesdayopen = $('.wednesdayopen').attr('Title');
 var wednesdayclose = $('.wednesdayclose').attr('Title');
 var thursdayopen = $('.thursdayopen').attr('Title');
 var thursdayclose = $('.thursdayclose').attr('Title');
 var fridayopen = $('.fridayopen').attr('Title');
 var fridayclose = $('.fridayclose').attr('Title');
 var saturdayopen = $('.saturdayopen').attr('Title');
 var saturdayclose = $('.saturdayclose').attr('Title');
 var sundayopen = $('.sundayopen').attr('Title');
 var sundayclose = $('.sundayclose').attr('Title');
 console.log(mondayopen);
 console.log(mondayclose);
 console.log(tuesdayopen);
 console.log(tuesdayclose);
 console.log(wednesdayopen);
 console.log(wednesdayclose);
 console.log(thursdayopen);
 console.log(thursdayclose);
 console.log(fridayopen);
 console.log(fridayclose);
 console.log(saturdayopen);
 console.log(saturdayclose);
 console.log(sundayopen);
 console.log(sundayclose);

 if (currentDay == 1 && currentHour > mondayopen && currentHour < mondayclose) {
 $('.open').css("display","inline-block");
 $('.closed').css("display","none");
 }
 else {

 }
 if (currentDay == 2 && currentHour > tuesdayopen && currentHour < tuesdayclose) {
 $('.open').css("display","inline-block");
 $('.closed').css("display","none");
 }
 else {

 }
 if (currentDay == 3 && currentHour > wednesdayopen && currentHour < wednesdayclose) {
 $('.open').css("display","inline-block");
 $('.closed').css("display","none");
 }
 else {

 }
 if (currentDay == 4 && currentHour > thursdayopen && currentHour < thursdayclose) {
 $('.open').css("display","inline-block");
 $('.closed').css("display","none");
 }
 else {

 }
 if (currentDay == 5 && currentHour > fridayopen && currentHour < fridayclose) {
 $('.open').css("display","inline-block");
 $('.closed').css("display","none");
 }
 else {

 }
 if (currentDay == 6 && currentHour > saturdayopen && currentHour < saturdayclose) {
 $('.open').css("display","inline-block");
 $('.closed').css("display","none");
 }
 else {

 }
 if (currentDay == 0 && currentHour > sundayopen && currentHour < sundayclose) {
 $('.open').css("display","inline-block");
 $('.closed').css("display","none");
 }
 else {

 }
 $('.openorclosed').load(function(){
 $(this).addClass('animated bounceInDown');
 });
 });







 (function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'share.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}id=id+'_';if(!gi.call(d,id)){qs=ce.call(d,'link');qs.rel='stylesheet';qs.id=id;qs.href=b+'share-button.css';s=gt.call(d,'head')[0];s.appendChild(qs,s)}})();
 */
  


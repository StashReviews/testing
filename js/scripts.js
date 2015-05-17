window.onload = (function() {

	// Prevent Right Click on Strain Image Starts Here
	$('.strainGallery').bind('contextmenu', function(e){ return false; }); 
	// Prevent Right Click on Strain Image Ends Here

    // Mobile Menu Drawer Open / Close Starts Here
    $("#menuMobile-toggler").click(function(){
		$('#menuMobile').css("left","0"); 
		$(this).css("display","none");
		$('#close-menuMobile').css("display","inherit");
	});
	$("#close-menuMobile").click(function(){
		$('#menuMobile').css("left","-75%");
		$(this).css("display","none");
		$('#menuMobile-toggler').css("display","inline");
	});
	$(".mobileNavLink").click(function(){
		$('#menuMobile').css("left","-75%");
		$("#close-menuMobile").css("display","none");
		$('#menuMobile-toggler').css("display","inline");
	});
	// Mobile Menu Drawer Open / Close Ends Here

	// Coming Soon Alert Starts Here
	$(".howItWorksComingSoonDispensaries").click(function(){
		alert("We're sorry, Dispensaries are not available yet. Check back often. For now, explore the Strains section.");
	});
	$(".howItWorksComingSoonDeals").click(function(){
		alert("We're sorry, Deals are not available yet. Check back often. For now, explore the Strains section.");
	});
	// Coming Soon Alert Ends Here

	// Up To Top Starts Here
    var offset = 250;
    var duration = 300;
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.upToTop').fadeIn(duration);
        } else {
            jQuery('.upToTop').fadeOut(duration);
        }
    });

    jQuery('.upToTop').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
	// Up To Top Ends Here

	// // Reviews Starts Here
	//   // Get a reference to the root of the chat data.
	// 	  var userId = usersService.getName(usersService.getCurrentUser())
    //    var itemType = 'strains';
    //    var itemId = $scope.$parent.$parent.strainDetails.$id;

    


    // When the user clicks on a rating bud, check to see if they have rated this strain already.






    // When the user clicks on submit review input, write the review to firebase.
    $('#submitReview').on( "click", function() {

      var avatar = $('.avatar').attr('src');
      var text = $('#reviewInput').val();

	    var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth();

      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var month = monthNames[mm];

      var yyyy = today.getFullYear();
      var today = month+' '+dd+', '+yyyy;
      
      if (! text) {
      	// If nothing was typed into review input, alert.
      	alert("Sorry, you can't submit a blank review.");
      } else {
      	// If a review was typed, push the avatar, name, date and review to firebase.
      	reviewsRef.push({avatar:avatar, name:userId, text:text, date:today});
      	userReviewsRef.push({avatar:avatar, name:userId, text:text, date:today});
      	// Reset review input.
      	$('#reviewInput').hide();
      	$('#submitReview').attr('value', "Your review was successful!").css("background","none");
      	$('.reviewBanner').text("You'll be able to see all of your reviews in a later release.");
      	$('.avatarWrap .avatar').css({"margin-left":"0px"});
      	$('.reviewBanner').show();

      	// Success alert.
      	alert("Awesome! Thanks for submitting a review. It may take a bit for your review to show up. Later, you'll be able to access all of your reviews to remember your highs!");
      }

    });

  	userId = $('.username').attr('title');
  	itemId = $('.strainId').attr('title');
    reviewsRef = new Firebase('https://deviineadmin.firebaseio.com/strains/' + itemId + '/reviews');
    userReviewsRef = new Firebase('https://deviineadmin.firebaseio.com/users/' + userId + '/reviews/' + itemId);


});

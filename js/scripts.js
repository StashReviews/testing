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

});
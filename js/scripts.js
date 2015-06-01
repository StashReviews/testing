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




	// // Strain Zoom Starts Here
	// zoom = document.getElementById('zoom'),
	// Zw = zoom.offsetWidth,
 //    Zh = zoom.offsetHeight,
 //    strainGalleryWrap = document.getElementById('strainGalleryWrap');

 //    var timeout, ratio, Ix, Iy;

	// $('.strainGalleryWrap').hover(function(){
	// 	$('#strainGallery').toggleClass('active');
	// 	$('#zoom').toggleClass('active');
	// });
	// $('.strainGalleryWrap').mousemove(function(event){
	// 	updateMagnifier();
	// });

	// function updateMagnifier(x,y) {
	//     zoom.style.top = (y) + 'px';
	//     zoom.style.left = (x) + 'px';
	//     zoom.style.backgroundPosition = (( Ix - x ) * ratio + Zw / 2 ) + 'px ' + (( Iy - y ) * ratio + Zh / 2 ) + 'px';
	// }

	// function onLoad() {
	//     ratio = strainGalleryWrap.naturalWidth / strainGalleryWrap.width;
	//     Ix = strainGalleryWrap.offsetLeft;
	//     Iy = strainGalleryWrap.offsetTop;
	// }

	// strainGalleryWrap.addEventListener('load',onLoad);
	// // Strain Zoom Ends Here


});

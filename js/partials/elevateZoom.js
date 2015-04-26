$( document ).ready(function() {
    console.log( "zoom is ready!" );
    $('.strainGallery').elevateZoom({
      zoomType:"lens",
      lensShape : "round",
      lensSize : 250
    });
});
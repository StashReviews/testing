

(function() {
  var zoom = document.getElementById('zoom'),
      Zw = zoom.offsetWidth,
      Zh = zoom.offsetHeight,
      strainGallery = document.getElementById('strainGallery');
      
  
  var timeout, ratio, Ix, Iy;

  function activate () {
    document.body.classList.add('active');
  }
  
  function deactivate() {
    document.body.classList.remove('active');
  }
  
  function updateMagnifier( x, y ) {
    zoom.style.top = ( y ) + 'px';
    zoom.style.left = ( x ) + 'px';
    zoom.style.backgroundPosition = (( Ix - x ) * ratio + Zw / 2 ) + 'px ' + (( Iy - y ) * ratio + Zh / 2 ) + 'px';
  }
  
  function onLoad () {
    ratio = strainGallery.naturalWidth / strainGallery.width;
    Ix = strainGallery.offsetLeft;
    Iy = strainGallery.offsetTop;
  }
  
  function onMousemove( e ) {
    clearTimeout( timeout );
    activate();
    updateMagnifier( e.x, e.y );
    timeout = setTimeout( deactivate, 2500 );
  }
  
  function onMouseleave () {
    deactivate();
  }

  strainGallery.addEventListener('load',onLoad);
  strainGallery.addEventListener('mousemove',onMousemove);
  strainGallery.addEventListener('mouseleave',onMouseleave);

})();
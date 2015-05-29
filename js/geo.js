(function() {
ref = new Firebase("https://deviineadmin.firebaseio.com");
geoFire = new GeoFire(ref);

  /* Uses the HTML5 geolocation API to get the current user's location */
  var getUserLocation = function() {
    if (typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
      console.log("Asking user to get their location");
      navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler);
    } else {
      console.log("Your browser does not support the HTML5 Geolocation API, so this demo will not work.")
    }
  };

  /* Callback method from the geolocation API which receives the current user's location */
  var geolocationCallback = function(location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    
    username = $('.username').attr('title');
    userId = $('.username').attr('title');
    geoFire = new GeoFire(ref);
    geocoder = new google.maps.Geocoder();
    userLocationRef = new Firebase('https://deviineadmin.firebaseio.com/users/' + userId + '/currentLocation');
    guestLocationRef = new Firebase('https://deviineadmin.firebaseio.com/users/guests/' + generateRandomString(10) + '/currentLocation');
    latlng = new google.maps.LatLng(latitude, longitude);
  

    console.log("Retrieved user's location: [" + latitude + ", " + longitude + "]");

    // Get City + State from Coordinates Using Geocoder from Google
    geocoder.geocode({ 'latLng': latlng }, function(results, status) {
        
      if (status == google.maps.GeocoderStatus.OK) {
        var level_1;
        var level_2;
        for (var x = 0, length_1 = results.length; x < length_1; x++){
          for (var y = 0, length_2 = results[x].address_components.length; y < length_2; y++){
              var type = results[x].address_components[y].types[0];
                if ( type === "administrative_area_level_1") {
                  level_1 = results[x].address_components[y].short_name;
                  if (level_2) break;
                } else if (type === "locality"){
                  level_2 = results[x].address_components[y].long_name;
                  if (level_1) break;
                }
            }
        }
        currentLocation = level_2 + ', ' + level_1;
        updateAddress(level_2, level_1);
      } 

      function updateAddress(city, prov){
        $('.location').html(currentLocation);
      }
        
      console.log("Current city is " + level_2 + ', ' + level_1);

      if (! latitude && ! longitude) {
        console.log("No location found.");
      } else if (! userId) {
        // userId = generateRandomString(10);
        guestLocationRef.push({geoX:latitude, geoY:longitude, currentLocation:currentLocation});
        console.log("Guest location added to Firebase.");
      } else {
        userLocationRef.push({geoX:latitude, geoY:longitude, currentLocation:currentLocation});
        console.log(userId + "s location was added to Firebase");
      }

      

    });
    
    userLocationRef.onDisconnect().remove();
    guestLocationRef.onDisconnect().remove();

    // ref.child("dispensaries").on("child_added", function(snapshot) {
    //   var dispensaryId = snapshot.key();
    //   var dispensary = snapshot.val();

    //   geoFire.set("<dispensary_id>", [dispensary.latitude, dispensary.longitude]).then(function() {
    //     console.log(dispensaryId + " has been added to GeoFire");
    //   }).catch(function(error) {
    //     console.log("Error adding " + dispensaryId + " to GeoFire: " + error);
    //   });
    // });

    // var geoQuery = geoFire.query({
    //   center: [userLocation.latitude, userLocation.longitude],
    //   radius: 5
    // });

    // var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {
    //   console.log(key + " entered query at " + location + " (" + distance + " km from center)");
    // });

    // // users's location is now store in newLocation
    // geoQuery.updateCriteria({
    //   center: [newLocation.latitude, newLocation.longitude]
    // });





    // @todo - Get distance to dispensary from user coordinates
    function getDistance() {

      userLat = location.coords.latitude;
      userLon = location.coords.longitude;
      endLat = new Firebase('https://deviineadmin.firebaseio.com/users/' + itemType + '/' + itemId + '/geoX'); // Put dispensary geoX here
      endLon = new Firebase('https://deviineadmin.firebaseio.com/users/' + itemType + '/' + itemId + '/geoY'); // Put dispensary geoY here

      function getDistanceFromLatLonInKm(userLat,userLon,endLat,endLon) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(endLat-userLat);  // deg2rad below
        var dLon = deg2rad(endLon-userLon); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(userLat)) * Math.cos(deg2rad(endLat)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }

      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }
    }






  }



  

  function generateRandomString(length) {
      var text = "";
      var validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for(var i = 0; i < length; i++) {
          text += validChars.charAt(Math.floor(Math.random() * validChars.length));
      }
      return text;
  }


  /* Handles any errors from trying to get the user's current location */
  var errorHandler = function(error) {
    if (error.code == 1) {
      alert("Some features on this website may not work without your location. Please enable location so you can get the whole DeViine experience. Your location will be deleted once you exit.");
      console.log("Error: PERMISSION_DENIED: User denied access to their location");
    } else if (error.code === 2) {
      console.log("Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached");
    } else if (error.code === 3) {
      console.log("Error: TIMEOUT: Calculating the user's location too took long");
    } else {
      console.log("Unexpected error code")
    }
  };

  var userLocation = getUserLocation();

  // var geoQuery = geoFire.query({
  //   center: [userLocation.latitude, userLocation.longitude],
  //   radius: 5
  // });

  // // We want to get notified whenever a location enters our query, so let's add a listener for that:
  // var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {
  //   console.log(key + " entered query at " + location + " (" + distance + " km from center)");
  // });

  // // users's location is now store in newLocation
  // geoQuery.updateCriteria({
  //   center: [newLocation.latitude, newLocation.longitude]
  // });

})();
  //removed return envelope
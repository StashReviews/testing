(function() {
ref = new Firebase("https://deviineadmin.firebaseio.com");
geoFire = new GeoFire(ref);


// ref.child("locations").on("child_added", function(snapshot) {
//   var locationId = snapshot.key();
//   var location = snapshot.val();

//   geoFire.set("<location_id>", [location.latitude, location.longitude]).then(function() {
//     console.log(locationId + " has been added to GeoFire");
//   }).catch(function(error) {
//     console.log("Error adding " + locationId + " to GeoFire: " + error);
//   });
// });

// getUserLocation() is your own code somewhere
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
    guestLocationRef = new Firebase('https://deviineadmin.firebaseio.com/users/Guests/currentLocation');
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
        guestLocationRef.push({geoX:latitude, geoY:longitude, currentLocation:currentLocation});
        console.log("Guest location added to Firebase.");
      } else {
        userLocationRef.push({geoX:latitude, geoY:longitude, currentLocation:currentLocation});
        console.log(userId + "s location was added to Firebase");
      }

    });
    

    // geoFire.set(username, [latitude, longitude]).then(function() {
    //   console.log("Current " + username + "'s location has been added to GeoFire");

    //   // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
    //   // remove their GeoFire entry
    //   firebaseRef.child(username).onDisconnect().remove();

    //   console.log("Added handler to remove user " + username + " from GeoFire when you leave this page.");
    //   console.log("You can use the link above to verify that " + username + " was removed from GeoFire after you close this page.");
    // }).catch(function(error) {
    //   console.log("Error adding user " + username + "'s location to GeoFire");
    // });
  }

  /* Handles any errors from trying to get the user's current location */
  var errorHandler = function(error) {
    if (error.code == 1) {
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

  var geoQuery = geoFire.query({
    center: [userLocation.latitude, userLocation.longitude],
    radius: 5
  });

  // We want to get notified whenever a location enters our query, so let's add a listener for that:
  var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {
    console.log(key + " entered query at " + location + " (" + distance + " km from center)");
  });

  // users's location is now store in newLocation
  geoQuery.updateCriteria({
    center: [newLocation.latitude, newLocation.longitude]
  });

})();
  //removed return envelope
(function() {
  var firebaseUrl = "https://dazzling-inferno-1178.firebaseIO.com/GeoLocation";  // Generate a Firebase location
  var firebaseRef = new Firebase(firebaseUrl);

  // Set the URL of the link element to be the Firebase URL *********NOT NECCESARY FOR ANYTHING BUT TESTING*********
  $("#firebaseRef").setAttribute("href", firebaseUrl);

  // Create a new GeoFire instance at the random Firebase location
  var geoFire = new GeoFire(firebaseRef);

  /* Uses the HTML5 geolocation API to get the current user's location */
  var getLocation = function() {
    if(typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
      log("Asking user to get their location");
      navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler);
    } else {
      log("Your browser does not support the HTML5 Geolocation API, so this demo will not work.")
    }
  };

  /* Callback method from the geolocation API which receives the current user's location */
  var geolocationCallback = function(location) {
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;

    var geoQuery = geoFire.query({
      center: [latitude, longitude],
      radius: 9000 //kilometers
    });
    var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distanceInKm) {
      var distanceInMiles = distanceInKm * 0.621;

// Append the number of miles to the html
      $("<div />").addClass("added").text(distanceInMiles.toFixed()).appendTo("#" + key);
    });

    log("Retrieved user's location: [" + latitude + ", " + longitude + "]");

    var username = "wesley";
    geoFire.set(username, [latitude, longitude]).then(function() {
      log("Current user " + username + "'s location has been added to GeoFire");

      // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
      // remove their GeoFire entry
      firebaseRef.child(username).onDisconnect().remove();

      log("Added handler to remove user " + username + " from GeoFire when you leave this page.");
      log("You can use the link above to verify that " + username + " was removed from GeoFire after you close this page.");
    }).catch(function(error) {
      log("Error adding user " + username + "'s location to GeoFire");
    });
  }

  /* Handles any errors from trying to get the user's current location */
  var errorHandler = function(error) {
    if(error.code == 1) {
      log("Error: PERMISSION_DENIED: User denied access to their location");
    } else if(error.code === 2) {
      log("Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached");
    } else if(error.code === 3) {
      log("Error: TIMEOUT: Calculating the user's location too took long");
    } else {
      log("Unexpected error code")
    }
  };

  // Get the current user's location
  getLocation();
//SETS THE LOCATIONS OF ALL OF THE DISPENSARIES IN KEYS ******THIS PART WILL COME OUT AND BE REPLACED BY THE OPERATIONS OF THE BACKEND********
  geoFire.set({
    "sativa_key": [47.685331, -117.262793],
    "satori_key": [47.741859, -117.412180],
    "cinder_key": [47.721611, -117.411764],
    "walkingraven_key": [39.680100, -104.987798]
  }).then(function() {
    console.log("Provided keys have been added to GeoFire");
  }, function(error) {
    console.log("Error: " + error);
  });
// this IS the number of miles between USER and DISPENSARY
  var selectedKey = document.getElementById("sativa_key").value;

  geoFire.get(selectedKey).then(function(location) {
    if(location === null) {
      console.log("Provided key is not in GeoFire");
    }
    else {
      console.log("Provided key has a location of " + location);
    }
  }, function(error) {
    console.log("Error: " + error);
  });


  /*************/
  /*  HELPERS  */
  /*************/
  /* Returns a random string of the inputted length */
  function generateRandomString(length) {
    var text = "";
    var validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i < length; i++) {
      text += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }

    return text;
  }

  /* Logs to the page instead of the console */
  function log(message) {
    var childDiv = document.createElement("div");
    var textNode = document.createTextNode(message);
    childDiv.appendChild(textNode);
    document.getElementById("log").appendChild(childDiv);
  }
});
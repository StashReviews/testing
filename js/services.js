// @todo Add error handling.
// @todo Look into caching the results of the itemsService methods.

angular.module('DeViine.services', [])

  .factory('usersService', ['$firebaseAuth', '$firebaseObject', 'dvUrl', function($firebaseAuth, $firebaseObject, dvUrl) {
    var dvRef = new Firebase(dvUrl);
    var dvAuth = $firebaseAuth(dvRef);
    var currentUser = null;

    return {
      setCurrentUser: function(user) {
          this.currentUser = user;
      },
      getCurrentUser: function() {
        return this.currentUser;
      },
      /**
       * @param {String} service
       * @param {Object} credentials
       */
      login: function(service, credentials) {
        switch(service) {
          case 'facebook':
          case 'twitter':
          case 'google':
            
            // Detect chrome mobile and run return dvAuth.$authWithOAuthRedirect(service);

            if( navigator.userAgent.match('CriOS') ) {
              return dvAuth.$authWithOAuthRedirect(service);
              location.reload();
            } else {
              return dvAuth.$authWithOAuthPopup(service);
            }
          break;

          case 'password':
            return dvAuth.$authWithPassword({
              email: credentials.email,
              password: credentials.password
            });
          location.reload();
          break;

        }
      },
      logout: function() {
        dvAuth.$unauth();
      },
      /**
       * @param {Object} credentials
       * @param {Object} profile
       */
      add: function(credentials, profile) {
        dvAuth.$createUser({
          email: credentials.email,
          password: credentials.password
        })
          .then(function(user) {
            this.saveProfile(user.uid, profile);
          });
      },
      // remove: function(userId) {}
      /**
       * @param {String} userId
       */
      getProfile: function(userId) {
        $firebaseObject( new Firebase(dvUrl + '/users/' + userId + '/profile') );
      },
      /**
       * @param {Object} userId
       * @param {Object} profile
       */
      saveProfile: function(userId, profile) {
        ( new Firebase(dvRef + '/users/' + userId + '/profile') ).set(profile);
      },
      /**
       * @param {String} email
       * @returns {String} md5sum
       */
      getEmailHash: function(email) {
        return email
          ? md5( email.trim().toLowerCase() )
          : '';
      },
      /**
       * @param {Object} user
       * @returns {boolean} isAdmin
       */
      isAdmin: function(user) {
        var adminIdList = [
          'twitter:2199988411', // Dan Siddoway
          'simplelogin:1',
          'twitter:318556297',
          'twitter:dberg15',
          'simplelogin:2',
          'google:103075984866184444011',
          'google:dakotaberg',
          'simplelogin:3',
          'twitter:154732114',
          'twitter:justinvinge',
          'simplelogin:4',
          'google:108704110120989212163',
          'google:justinvinge'          
        ];

        return ( user && user.uid )
          // adminList.includes(user.uid)
          // @todo Note that -1 (the return value for 'not found') also happens to be the index of the last item in the array.  Error-prone.
          ? ( adminIdList.indexOf(user.uid) !== -1 )
          : false;
      },
      /**
       * @param {Object} user
       * @returns {String} name
       */
      getName: function(user) {
        if(user) {
          var name = '';

          switch(user.provider) {
            case 'facebook':
            case 'twitter':
            case 'google':
              name = 'displayName';
            break;

            case 'password':
              name = 'email';
            break;
          }

          return user[user.provider][name];
        } else {
          return '';
        }
      },
      /**
       * @param {Object} user
       * @returns {string} avatarUrl
       */
      getAvatarUrl: function(user) {
        if(user) {
          var url = '';

          switch(user.provider) {
            case 'facebook':
              url = user[user.provider].cachedUserProfile.picture.data.url;
            break;

            case 'twitter':
              url = user[user.provider].cachedUserProfile.profile_image_url;
            break;

            case 'google':
              url = 'https://www.gravatar.com/avatar/' + this.getEmailHash(user[user.provider].email);
            break;

            case 'password':
              url = 'https://www.gravatar.com/avatar/' + this.getEmailHash(user[user.provider].email);
            break;
          }

          return url;
        } else {
          return '';
        }
      }
    };
  }])
  .factory('itemsService', ['$firebaseObject', '$firebaseArray', 'dvUrl', function($firebaseObject, $firebaseArray, dvUrl) {
    return {
      /**
       * @param {String} itemType
       * @param {String} itemId
       */
      get: function(itemType, itemId) {
        return $firebaseObject( new Firebase(dvUrl + '/' + itemType + '/' + itemId) );
      },
      /**
       * @param {String} itemType
       * @returns {FirebaseArray}
       */
      getAll: function(itemType) {
        return $firebaseArray( ( new Firebase(dvUrl + '/' + itemType) ).orderByChild('featured').equalTo("0") ).$loaded();
      },
      /**
       * @param {String} itemType
       * @returns {FirebaseArray}
       */
      // getFeatured is currently limiting to first 2.
      // Should limit to the first 2 that have .featured = true.
      getFeatured: function(itemType) {
        return $firebaseArray( ( new Firebase(dvUrl + '/' + itemType) ).orderByChild('featured').equalTo("true").limitToFirst(2) ).$loaded();
      },
      /**
       * @param {String} itemType
       * @returns {FirebaseArray}
       */
      // getNew is limiting to last 2.
      getNew: function(itemType) {
        return $firebaseArray( ( new Firebase(dvUrl + '/' + itemType) ).orderByChild('new').equalTo("true").limitToLast(2) ).$loaded();
      },
      /**
       * @param {String} itemType
       * @returns {FirebaseArray}
       */
      // getOther is currently limiting to last 2. 
      getOther: function(itemType) {
        return $firebaseArray( ( new Firebase(dvUrl + '/' + itemType) ).limitToLast(4) ).$loaded();
      },
      /**
       * @param {String} itemType
       * @param {Number} count
       * @returns {FirebaseArray}
       */
      getHighestRated: function(itemType) {
        // var items = this.getAll(itemType).getElementById("avgRating").sort(function(a,b){return b - a});

        // @todo Filter out all but the highest-rated items.
        // return items;

        return $firebaseArray( ( new Firebase(dvUrl + '/' + itemType) ).orderByChild('rating') );
      }
      // ,
      // reviews: function (itemType, itemId) {
      //   // return $firebaseArray( ( new Firebase(dvUrl + '/' + itemType + '/' + itemId + '/reviews') ) );
      //   return $firebaseArray( new Firebase(dvUrl + '/' + itemType + '/' + itemId + '/reviews') );
      // }
    };
  }])
  .factory('ratingsService', ['dvUrl', function(dvUrl) {
    //removed return envelope
    var obj = {};
      
      /* @todo Add a check to determine whether or not the specified user has already rated the specified item.
       
      /**
       * @param {Object} ratings
       * @returns {Number} avgRating
       */
      obj.getAvgRating = function(ratings) {
        var ratingsTotal = 0;
        var ratingsCount = this.getRatingsCount(ratings);

        if(ratingsCount === 0) {
          return 0;
        } else {
          for(var rating in ratings) {
            if( ratings.hasOwnProperty(rating) ) {
              ratingsTotal += parseFloat(ratings[rating]);
            }
          }

          return (ratingsTotal / ratingsCount).toFixed(1);
        }
      },

      obj.getUserRating = function() {

      },

      /**
       * @param {Object} ratings
       * @returns {Number} ratingsCount
       */
      obj.getRatingsCount = function(ratings) {
        return ratings == null
          ? 0
          : Object.keys(ratings).length;
      }
      //removed return envelope
      return obj;
  }])
  .factory('reviewsService', ['$firebaseArray', 'dvUrl', function($firebaseArray, dvUrl) {
    //removed return envelope

    // var itemType = $('.pageTitle').attr('title');
    // var itemId = $('.pageId').attr('title');

    // return {
    //   getReviews: function (itemType, itemId) {
    //     return $firebaseArray( new Firebase(dvUrl + '/' + itemType + '/' + itemId + '/reviews') );
    //   }
    // };
      /**
       * @param {Object} reviews
       * @returns {Number} reviewsCount
       */
      var obj = {};
      obj.getReviewsCount = function() {
        return reviews == null
          ? 0
          : Object.keys(reviews).length;
      }
      //removed return envelope
      return obj;
  }])
  .factory('locationService', ['$http', '$q', 'dvUrl', '$firebaseObject', function($http, $q, dvUrl, $firebaseObject) {
    return {
      /**
       * @param {String} address
       * @returns {google.maps.LatLng} coordinates
       */
      getCoordinatesFromAddress: function(address) {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address)
          .then(function(data) {
            var coords = data.results[0].geometry.location;

            return new google.maps.LatLng(coords.lat, coords.lng);
          });
      },
      getCurrentCity: function() {
        return '';
      },
      /**
       * @returns {google.maps.LatLng|null} coords
       */
      getCurrentLocation: function() {
        if(typeof navigator !== 'undefined' && typeof navigator.geolocation !== 'undefined') {
          navigator.geolocation.getCurrentPosition(function(location) {
            var coords = location.coords;

            return new google.maps.LatLng(coords.lat, coords.lng);
          }, function(error) {
            console.log(error);
          });
        } else {
          console.log('Your browser does not support the HTML5 Geolocation API, so this demo will not work.')
        }
      },
      /**
       * Note that this requires that the dispensary have coordinates associated with it.  This shouldn't be a problem, though, as our saveDispensary function geocodes provided addresses automatically.
       *
       * @param {String} dispensaryId
       * @returns {Promise}
       */
      getDistanceToDispensary: function(dispensaryId) {
        var deferred = $q.defer();

        setTimeout(function() {
          // @todo Re-add browser check for geolocation.
          navigator.geolocation.getCurrentPosition(function(location) {
            // @todo Log positions, so that we know where folks are using our service.  (If logged in as a user, log locations under the user's Firebase record.)
            var coords = location.coords;
            var currentLocation = new google.maps.LatLng(coords.latitude, coords.longitude);

            $firebaseObject(new Firebase(dvUrl + '/dispensaries/' + dispensaryId)).$loaded()
              .then(function(dispensary) {
                var distance = google.maps.geometry.spherical.computeDistanceBetween(currentLocation, new google.maps.LatLng(dispensary.geoX, dispensary.geoY));

                distance
                  ? deferred.resolve( (distance / 1609.34).toFixed(1) ) // convert meters to miles
                  : deferred.reject('Could not compute distance to dispensary.');
              })
              .catch(function(error) {
                deferred.reject('Could not compute distance to dispensary.');
                console.log(error);
              });
          }, function(error) {
            deferred.reject('Could not compute distance to dispensary.');
            console.log(error);
          });
        }, 1000);

        return deferred.promise;
      }
    }
  }])
;

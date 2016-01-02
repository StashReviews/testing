// @todo Add error handling.

angular.module('Stash.controllers', [])
  /*
  .controller('pageCtrl', ['$scope', 'itemType', 'itemsService', function($scope, itemType, itemsService) {
    $scope.items = itemsService.getAll(itemType);
  }])

  .controller('detailsCtrl', ['$scope', 'itemType', '$stateParams', function($scope, itemType, $stateParams) {
    $scope.itemDetails = itemsService.get(itemType, $stateParams.itemId);
  }])
  */
  .controller('StashCtrl', ['$scope', '$state', '$modal', 'dvUrl', 'currentUser', 'usersService', function($scope, $state, $modal, dvUrl, currentUser, usersService) {
    $scope.isAdmin = usersService.isAdmin;

    $scope.getEmailHash = usersService.getEmailHash;

    $scope.currentUser = currentUser;
    usersService.setCurrentUser(currentUser);

    // @todo Note that $scope.currentName will always be one step behind the digest cycle if we pass $scope.currentUser to it.
    $scope.currentName = usersService.getName(currentUser);

    // $scope.currentCity = locationService.getCurrentCity();

    // @todo Note that $scope.currentAvatar will always be one step behind the digest cycle if we pass $scope.currentUser to it.
    $scope.currentAvatar = usersService.getAvatarUrl(currentUser);

    // $scope.showLoginModal = function() {
    //   var loginModalInstance = $modal.open({
    //     size: 'md',
    //     templateUrl: 'partials/modals/' + ( $scope.currentUser ? 'logout' : 'login' ) + '.html',
    //     controller: 'loginModalCtrl'
    //   });

    //   loginModalInstance.result
    //     .then(function(currentUser) {
    //       $scope.currentUser = currentUser;
    //       usersService.setCurrentUser(currentUser);
    //     });
    // };

    $scope.logout = function() {
      usersService.logout();

      $state.go('root.home');

      location.reload();

      $('.userDropdown').toggle();
    };

  }])
  // .controller('loginModalCtrl', ['$scope', '$state', '$modalInstance', 'usersService', function($scope, $state, $modalInstance, usersService) {
  //   $scope.credentials = {};

  //   $scope.login = function(service, credentials) {
  //     usersService.login(service, credentials)
  //       .then(function(currentUser) {
  //         location.reload();
  //         $modalInstance.close(currentUser);
  //         $state.go('root.home');
  //       }, function(error) {
  //         console.log(error);
  //       });
  //   };

  //   $scope.logout = function() {
  //     usersService.logout();

  //     $modalInstance.close(null);

  //     $state.go('root.home');
  //   };

  //   $scope.close = function() {
  //     $modalInstance.dismiss();
  //   };
  // }])
  // .controller('ratingChangeModalCtrl', ['$scope', '$state', '$modalInstance', 'usersService', function($scope, $state, $modalInstance, usersService) {


  //   $scope.close = function() {
  //     $modalInstance.dismiss();
  //   };
  // }])
  .controller('homeCtrl', ['$scope', '$q', 'itemsService', 'ratingsService', function($scope, $q, itemsService, ratingsService) {
    // $scope.featuredDispensaries = itemsService.getFeatured('dispensaries');

    // $scope.featuredDeals = itemsService.getFeatured('deals');

    // $scope.featuredStrains = itemsService.getFeatured('strains');
    // $scope.newStrains = itemsService.getNew('strains');

    // $q.all(itemsService.getFeatured('strains'))
    // .then(function(strainData) {
    //   strainData.forEach(function(strains) {
    //     strains.sort(function(a, b) {
    //       return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
    //     });
    //   });

    //   $scope.featuredStrains = strainData[1];
    // });

    // $q.all(itemsService.getFeatured('dispensaries'))
    //   .then(function(dispensaryData) {
    //     dispensaryData.forEach(function(dispensaries) {
    //       dispensaries.sort(function(a, b) {
    //         return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
    //       });
    //     });

    //     $scope.featuredDispensaries = dispensaryData[1];
    //   });


    $q.all([itemsService.getOther('edibles'), itemsService.getFeatured('edibles')])
    .then(function(edibleData) {
      edibleData.forEach(function(edibles) {
        edibles.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.otherEdibles = edibleData[0];
      $scope.featuredEdibles = edibleData[1];
    });

    $q.all([itemsService.getOther('concentrates'), itemsService.getFeatured('concentrates')])
    .then(function(concentrateData) {
      concentrateData.forEach(function(concentrates) {
        concentrates.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.otherConcentrates = concentrateData[0];
      $scope.featuredConcentrates = concentrateData[1];
    });

    $q.all([itemsService.getOther('strains'), itemsService.getFeatured('strains')])
    .then(function(strainData) {
      strainData.forEach(function(strains) {
        strains.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.featuredStrains = strainData[1];
    });

    $q.all([itemsService.getAll('dispensaries'), itemsService.getFeatured('dispensaries')])
    .then(function(dispensaryData) {
      dispensaryData.forEach(function(dispensaries) {
        dispensaries.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.featuredDispensaries = dispensaryData[1];
    });


  }])
  .controller("signupCtrl", function($scope, $state, $firebaseObject, $firebaseArray, usersService) {
    var ref = new Firebase("https://stashreviews.firebaseio.com");
    var refUsers = new Firebase("https://stashreviews.firebaseio.com/users");

    $scope.credentials = {};

    $('#submitUser').on( "click", function(error, userInfo, userData) {

      // Get Username and Email From Inputs
      var username = $('.usernameInput').val();
      var email = $('.emailInput').val();
      var password = $('.passwordInput').val();
      // Get Firebase references
      var ref = new Firebase("https://stashreviews.firebaseio.com");
      var refUsers = new Firebase("https://stashreviews.firebaseio.com/users");
      // Get Todays Date
      var today = new Date();
      // Get The Day
      var dd = today.getDate();
      // Get The Month
      var mm = today.getMonth()+1; //January is 0!
      // Get The Year
      var yyyy = today.getFullYear();
      // Add a '0' if One Digit
      if(dd<10) { dd='0'+dd } 
      if(mm<10) { mm='0'+mm }
      // Name of Months
      var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      // Format The Date: "January 01, 2015"
      var myDate, myFormatDate;
      var date_str ='XX/XX/XXXX';
      var t = date_str.split("/");
      if(t[2]) {
          myDate = new Date(t[2], t[0] - 1, t[1]);
          myFormatDate = MONTHS[mm-1] + " " + dd + ", " + yyyy;
      } else {
          myDate = new Date(yyyy, t[0] - 1, t[1]);
          myFormatDate = MONTHS[mm-1] + ", " + yyyy;
      }
        
      // This is the good stuff
        if (! username) {
          // If nothing was typed into username input, alert.
          alert("You must enter a username.");
        } else if (! email) {
          // If nothing was typed into username input, alert.
          alert("You must enter an email address.");
        } else if (! password) {
          // If nothing was typed into username input, alert.
          alert("You must enter a password.");
        } else {
          // Create A New User Auth on Firebase
          ref.createUser({
            email    : email,
            username : username,
            password : password
          }, function(error, userData) {
            if (error) {
              // Why is this firing no matter what?
              console.log("Error creating user:", error);
            } else {
              console.log("Successfully created user account with uid:", userData.uid);

              // Set username, date, email and uid to Firebase.
              var userInfo = {
                date: myFormatDate,
                username: username,
                email: email,
                uid: userData.uid
              }
            refUsers.child(username).set(userInfo, function(error) {
              if (error) {
              alert("Whoops! It looks like " + username + " is already taken. Please try another!");
              console.log("Username is already taken.");

              // Removes User Auth From Firebase
              ref.removeUser({
                email: email,
                username : username,
                password : password
              }, function(error) {
                if (error) {
                  switch (error.code) {
                    case "INVALID_USER":
                      console.log("The specified user account does not exist.");
                      break;
                    case "INVALID_PASSWORD":
                      console.log("The specified user account password is incorrect.");
                      break;
                    default:
                      console.log("Error removing user:", error);
                  }
                } else {
                  console.log("User account deleted successfully!");
                }
              });
              } else {
                console.log("Successfully created user by the username:", username);
                // @todo Login user and go to home page.
          
              }

            });
            }
        });       
        }

    });

  })
  .controller("signinCtrl", function($scope, $state, $firebaseObject, $firebaseArray, usersService) {

    $scope.credentials = {};

    $scope.login = function(service, credentials) {
      usersService.login(service, credentials)
        .then(function(currentUser) {
          $state.go('root.home');
          location.reload();
        }, function(error) {
          console.log(error);
          // If email or password was entered incorrectly
          alert("Email / password combination incorrect. Please try again.");
        });
    };


  })
  .controller('usersCtrl', ['$scope', 'usersService', 'ratingsService', function($scope, usersService, ratingsService) {

  }])
  .controller('userProfileCtrl', ['$scope', '$stateParams', 'usersService', function($scope, $stateParams, usersService) {
    
    $scope.userDetails = usersService.getProfile('users', $stateParams.userId);

  }])
  .controller('userBuddiesCtrl', ['$scope', 'usersService', function($scope, usersService) {

  }])
  .controller('userReviewsCtrl', ['$scope', 'usersService', function($scope, usersService) {

  }])
  .controller('businessProfileCtrl', ['$scope', '$stateParams', 'businessesService', function($scope, $stateParams, businessesService) {
    
    $scope.businessDetails = businessesService.getProfile('businesses', $stateParams.businessId);

  }])
  .controller('businessManageCtrl', ['$scope', '$firebaseObject', 'dvUrl', function($scope, $firebaseObject, dvUrl) {
    $firebaseObject( new Firebase(dvUrl + '/businesses') ).$loaded()
      .then(function(businesses) {
        $scope.businesses = businesses;
      });

    $scope.newBusiness = function() {
      $scope.businessId = '';
      $scope.business = {};
    };

    $scope.loadBusiness = function(businessId) {
      $scope.business = $scope.businesses[businessId];
    };

    $scope.saveBusiness = function(businessId, business) {
      ( new Firebase(dvUrl + '/businesses/' + businessId) ).set(business);
    };

    // Maintaining Height of Textarea Starts Here
    $("textarea").height( $("textarea")[0].scrollHeight );
    // Maintaining Height of Textarea Ends Here
    
  }])
  .controller('dispensariesCtrl', ['$scope', '$q', 'itemsService', 'ratingsService', function($scope, $q, itemsService, ratingsService) {
    // Wait for both our dispensaries and our featured dispensaries to load.
    // @todo Might we need to remove duplicate entries?
    $q.all([itemsService.getAll('dispensaries'), itemsService.getFeatured('dispensaries')])
      .then(function(dispensaryData) {
        dispensaryData.forEach(function(dispensaries) {
          dispensaries.sort(function(a, b) {
            return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
          });
        });

        $scope.dispensaries = dispensaryData[0];
        $scope.featuredDispensaries = dispensaryData[1];
      });
  }])
  .controller('dispensaryDetailsCtrl', ['$scope', '$q', '$filter', '$stateParams', 'itemsService', 'ratingsService', 'reviewsService', function($scope, $q, $filter, $stateParams, itemsService, ratingsService, reviewsService) {
    
    $scope.today = $filter('date')(new Date(), 'EEEE');

    $scope.dispensary = itemsService.get('dispensaries', $stateParams.dispensaryId);
    // // @todo Exclude the current dispensary from the results of itemsService.getFeatured().
    // $scope.featureddispensaries = itemsService.getFeatured('dispensaries');
    // // @todo Exclude the current dispensary from the results of itemsService.getOther().
    // $scope.otherdispensaries = itemsService.getOther('dispensaries');

    locationService.getDistanceToDispensary($stateParams.dispensaryId)
      .then(function(distance) {
        $scope.distanceToDispensary = distance;
      });

    $q.all([itemsService.getOther('dispensaries'), itemsService.getFeatured('dispensaries')])
    .then(function(dispensaryData) {
      dispensaryData.forEach(function(dispensaries) {
        dispensaries.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.otherDispensaries = dispensaryData[0];
      $scope.featuredDispensaries = dispensaryData[1];
    });


  }])
  .controller('dispensariesManageCtrl', ['$scope', '$http', '$filter', '$firebaseObject', 'dvUrl', function($scope, $http, $filter, $firebaseObject, dvUrl) {
    $scope.times = [];

    // split the day into 15-minute blocks
    for(var h = 0; h <= 23; h++) {
      for(var m = 0; m <= 3; m++) {
        var hour = (h % 12 == 0) ? '12' : (h % 12);
        var minute = (m == 0) ? '00' : (m * 15);
        var period = (h < 12) ? 'AM' : 'PM';

        $scope.times.push( hour + ':' + minute + ' ' + period );
      }
    }

    $scope.activeDispensaryId = ''; // look up an existing dispensary
    $scope.dispensary = {}; // add a new dispensary

    // add a new item
    $scope.activeItemId = '';
    $scope.itemType = '';
    $scope.item = {};

    // load dispensaries
    // @todo Add a Firebase listener that re-loads the dispensary menu table whenever we add or edit a menu item.
    $firebaseObject( new Firebase(dvUrl + '/dispensaries') ).$loaded()
      .then(function(dispensaries) {
        $scope.dispensaries = dispensaries;
      });

    $scope.newDispensary = function() {
      $scope.activeDispensaryId = '';
      $scope.dispensary = {}; // clear the dispensary form
    };

    $scope.loadDispensary = function(dispensaryId) {
      $scope.activeDispensaryId = dispensaryId;
      $scope.dispensary = $scope.dispensaries[dispensaryId];

      $scope.newItem();
    };

    // @todo Consider saving the dispensary's coordinates to '/locations/<dispensaryId>'.
    $scope.saveDispensary = function(dispensaryId, dispensary) {
      /*
        Removes the '$$hashKey' key from the 'dispensary' object, making the latter acceptable to Firebase.
        @see http://stackoverflow.com/a/23656919
       */
      dispensary = JSON.parse( angular.toJson(dispensary) );

      /*
        Use a short-circuit operator to re-assign the dispensary ID variable if we're dealing with an existing dispensary.
        (Note that this is only necessary because we specify dispensary IDs manually (via a text input).  Were this not the case, this part of the function would look more like what we have in saveItem(), below, where we automatically generate IDs.  Foor for thought.
       */
      dispensaryId = $scope.activeDispensaryId || dispensaryId;

      // Return an error if not given a dispensary ID.
      if( !( dispensaryId ) ) {
        console.log('saveDispensary: No dispensary ID provided.');

        return;
      }

      /*
        Ensure that we geocode dispensary addresses.
        @todo Check for an address update, in which case we need to geocode the new address.
       */
      if( !( dispensary.geoX && dispensary.geoY ) ) {
        var dispensaryAddress = dispensary.location.street + ', ' + dispensary.location.city + ', ' + dispensary.location.state + ' ' + dispensary.location.zip;

        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + dispensaryAddress)
          .success(function(data) {
            var coords = data.results[0].geometry.location;

            dispensary.geoX = coords.lat;
            dispensary.geoY = coords.lng;

            ( new Firebase(dvUrl + '/dispensaries/' + dispensaryId) ).set(dispensary);
          })
          .error(function(error) {
            console.log('saveDispensary: Error when attempting to geocode dispensary address: '+ error);
          });
      } else {
        ( new Firebase(dvUrl + '/dispensaries/' + dispensaryId) ).set(dispensary);
      }
    };

    $scope.newItem = function() {
      $scope.activeItemId = '';
      $scope.itemType = '';
      $scope.item = {}; // clear the item form
    };

    $scope.loadItem = function(itemType, itemId) {
      // If we haven't loaded a dispensary, return an error.
      if( !( $scope.activeDispensaryId ) ) {
        console.log('loadItem: Please specify a dispensary, so we know whose menu to update.');

        return;
      }

      $scope.activeItemId = itemId;
      $scope.itemType = itemType;

      ( new Firebase(dvUrl + '/dispensaries/' + $scope.activeDispensaryId + '/menu/' + itemType + '/' + itemId) ).once('value', function(item) {
        $scope.item = item.val();
      });
    };

    $scope.saveItem = function(itemType, item) {
      // If we haven't loaded a dispensary, return an error.
      if( !( $scope.activeDispensaryId ) ) {
        console.log('loadItem: Please specify a dispensary, so we know whose menu to update.');

        return;
      }

      item = JSON.parse( angular.toJson(item) );

      if($scope.activeItemId) {
        ( new Firebase(dvUrl + '/dispensaries/' + $scope.activeDispensaryId + '/menu/' + itemType + '/' + $scope.activeItemId) ).set(item);
      } else {
        ( new Firebase(dvUrl + '/dispensaries/' + $scope.activeDispensaryId + '/menu/' + itemType) ).push(item);
      }
    };

    //$scope.addPriceField = function() {
    //  var priceField = jQuery('.priceField');
    //  var priceFieldCopy = priceField.clone()[0];
    //
    //  // @todo Fix this, as it also copies any values entered into the inputs.
    //  priceField.parent().append(priceFieldCopy);
    //};
  }])
  .controller('dealsCtrl', ['$scope', '$firebaseObject', 'dvUrl', 'itemsService', function($scope, $firebaseObject, dvUrl, itemsService) {
    /**
     * @param {Date} endDate
     * @returns {Boolean} hasExpired
     */
    function hasExpired(endDate) {
      var today = new Date();

      return ( today >= endDate );
    }

    /**
     * @param {String} dealId
     * @returns {Boolean} dealExpired
     */
    $scope.dealExpired = function(dealId) {
      $firebaseObject( new Firebase(dvUrl + '/deals/' + dealId + '/endDate') ).$loaded()
        .then(function(dealEndDate) {
          return hasExpired( new Date(dealEndDate) );
        });
    };

    // @todo Only show deals that have yet to expire.
    $scope.deals = itemsService.getAll('deals');
  }])
  .controller('dealDetailsCtrl', ['$scope', '$stateParams', 'itemsService', function($scope, $stateParams, itemsService) {
    $scope.dealDetails = itemsService.get('deals', $stateParams.dealId);

    // @todo Exclude the current deal from the results of itemsService.getFeatured().
    $scope.featuredDeals = itemsService.getFeatured('deals');
    // @todo Exclude the current deal from the results of itemsService.getFeatured().    
    $scope.otherDeals = itemsService.getOther('deals');
  }])
  .controller('dealsManageCtrl', ['$scope', '$firebaseObject', 'dvUrl', function($scope, $firebaseObject, dvUrl) {
    $firebaseObject( new Firebase(dvUrl + '/deals') ).$loaded()
      .then(function(deals) {
        $scope.deals = deals;
        // @todo Initialize 'deal' to the first available deal.
        $scope.deal = {};
      });

    $scope.newDeal = function() {
      $scope.dealId = '';
      $scope.deal = {};
    };

    $scope.loadDeal = function(dealId) {
      $scope.deal = $scope.deals[dealId];
    };

    // @todo Implement saveDeal() method.  Look up the dispensary by ID, add it to the 'deal' object, then push the deal to Firebase under '/deals' and '/dispensaries/<id>/deals'.
    $scope.saveDeal = function(dealId, deal) {
      ( new Firebase(dvUrl + '/deals/' + dealId) ).set(deal);
    };
  }])
  .controller('strainsCtrl', ['$scope', '$q', 'itemsService', 'ratingsService', function($scope, $q, itemsService, ratingsService) {
    
     // $scope.strainDetails = itemsService.getAll('strains', $stateParams.strainId);
     // $scope.featuredStrains = itemsService.getFeatured('strains', $stateParams.strainId);
    // Wait for both our strains and our featured strains to load.
    // @todo Might we need to remove duplicate entries?
    // $q.all([itemsService.getAll('strains'), itemsService.getFeatured('strains')])
    //   .then(function(strainData) {
    //     strainData.forEach(function(strains) {
    //       strains.sort(function(a, b) {
    //         return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
    //       });
    //     });

    //     $scope.strains = strainData[0];
    //     $scope.featuredStrains = strainData[1];
    //   });

    $q.all([itemsService.getOther('strains'), itemsService.getFeatured('strains')])
    .then(function(strainData) {
      strainData.forEach(function(strains) {
        strains.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.otherStrains = strainData[0];
      $scope.featuredStrains = strainData[1];
    });

    $q.all([itemsService.getOther('strains'), itemsService.getAll('strains')])
    .then(function(strainData) {
      strainData.forEach(function(strains) {
        strains.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.otherStrains = strainData[0];
      $scope.strains = strainData[1];
    });

  }])
  .controller('strainDetailsCtrl', ['$scope', '$q', '$stateParams', 'itemsService', 'ratingsService', 'reviewsService', function($scope, $q, $stateParams, itemsService, ratingsService, reviewsService) {
    $scope.strainDetails = itemsService.get('strains', $stateParams.strainId);
    // // @todo Exclude the current strain from the results of itemsService.getFeatured().
    // $scope.featuredStrains = itemsService.getFeatured('strains');
    // // @todo Exclude the current strain from the results of itemsService.getOther().
    // $scope.otherStrains = itemsService.getOther('strains');

    $q.all([itemsService.getOther('strains'), itemsService.getFeatured('strains')])
    .then(function(strainData) {
      strainData.forEach(function(strains) {
        strains.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.otherStrains = strainData[0];
      $scope.featuredStrains = strainData[1];
    });


    // $scope.showRatingChangeModal = function() {
    //   var ratingChangeModalInstance = $modal.open({
    //     size: 'md',
    //     templateUrl: 'partials/modals/ratingChange.html',
    //     controller: 'ratingChangeModalCtrl'
    //   });

    //   ratingChangeModalInstance.result
    //     .then(function(currentUser) {
    //       $scope.currentUser = currentUser;
    //       usersService.setCurrentUser(currentUser);
    //     });
    // };

    // $q.all([itemsService.reviews('reviews')]);

    // $scope.reviews = itemsService.reviews('reviews');

  }])
  .controller('strainsManageCtrl', ['$scope', '$firebaseObject', 'dvUrl', function($scope, $firebaseObject, dvUrl) {
    $firebaseObject( new Firebase(dvUrl + '/strains') ).$loaded()
      .then(function(strains) {
        $scope.strains = strains;
        // @todo Initialize 'strain' to the first available strain.
      });

    $scope.chemistries = [
      'Indica',
      'Hybrid',
      'Sativa'
    ];

    $scope.newStrain = function() {
      $scope.strainId = '';
      $scope.strain = {};
    };

    $scope.loadStrain = function(strainId) {
      $scope.strain = $scope.strains[strainId];
    };

    $scope.saveStrain = function(strainId, strain) {
      ( new Firebase(dvUrl + '/strains/' + strainId) ).set(strain);
    };
  }])
  .controller('concentratesCtrl', ['$scope', '$q', 'itemsService', 'ratingsService', function($scope, $q, itemsService, ratingsService) {
    
     // $scope.concentrateDetails = itemsService.getAll('concentrates', $stateParams.concentrateId);
     // $scope.featuredconcentrates = itemsService.getFeatured('concentrates', $stateParams.concentrateId);
    // Wait for both our concentrates and our featured concentrates to load.
    // @todo Might we need to remove duplicate entries?
    // $q.all([itemsService.getAll('concentrates'), itemsService.getFeatured('concentrates')])
    //   .then(function(concentrateData) {
    //     concentrateData.forEach(function(concentrates) {
    //       concentrates.sort(function(a, b) {
    //         return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
    //       });
    //     });

    //     $scope.concentrates = concentrateData[0];
    //     $scope.featuredconcentrates = concentrateData[1];
    //   });

    $q.all([itemsService.getOther('concentrates'), itemsService.getFeatured('concentrates')])
    .then(function(concentrateData) {
      concentrateData.forEach(function(concentrates) {
        concentrates.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.otherConcentrates = concentrateData[0];
      $scope.featuredConcentrates = concentrateData[1];
    });

    $q.all([itemsService.getOther('concentrates'), itemsService.getAll('concentrates')])
    .then(function(concentrateData) {
      concentrateData.forEach(function(concentrates) {
        concentrates.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.otherConcentrates = concentrateData[0];
      $scope.concentrates = concentrateData[1];
    });

  }])
  .controller('concentrateDetailsCtrl', ['$scope', '$q', '$stateParams', 'itemsService', 'ratingsService', 'reviewsService', function($scope, $q, $stateParams, itemsService, ratingsService, reviewsService) {
    $scope.concentrateDetails = itemsService.get('concentrates', $stateParams.concentrateId);
    // // @todo Exclude the current concentrate from the results of itemsService.getFeatured().
    // $scope.featuredconcentrates = itemsService.getFeatured('concentrates');
    // // @todo Exclude the current concentrate from the results of itemsService.getOther().
    // $scope.otherconcentrates = itemsService.getOther('concentrates');

    $q.all([itemsService.getOther('concentrates'), itemsService.getFeatured('concentrates')])
    .then(function(concentrateData) {
      concentrateData.forEach(function(concentrates) {
        concentrates.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.otherConcentrates = concentrateData[0];
      $scope.featuredConcentrates = concentrateData[1];
    });

    // $scope.showRatingChangeModal = function() {
    //   var ratingChangeModalInstance = $modal.open({
    //     size: 'md',
    //     templateUrl: 'partials/modals/ratingChange.html',
    //     controller: 'ratingChangeModalCtrl'
    //   });

    //   ratingChangeModalInstance.result
    //     .then(function(currentUser) {
    //       $scope.currentUser = currentUser;
    //       usersService.setCurrentUser(currentUser);
    //     });
    // };

    // $q.all([itemsService.reviews('reviews')]);

    // $scope.reviews = itemsService.reviews('reviews');

  }])
  .controller('concentratesManageCtrl', ['$scope', '$firebaseObject', 'dvUrl', function($scope, $firebaseObject, dvUrl) {
    $firebaseObject( new Firebase(dvUrl + '/concentrates') ).$loaded()
      .then(function(concentrates) {
        $scope.concentrates = concentrates;
        // @todo Initialize 'concentrate' to the first available concentrate.
      });

    $scope.types = [
      'Kief',
      'Oil',
      'Shatter',
      'Wax',
      'Other'
    ];  

    $scope.newConcentrate = function() {
      $scope.concentrateId = '';
      $scope.concentrate = {};
    };

    $scope.loadConcentrate = function(concentrateId) {
      $scope.concentrate = $scope.concentrates[concentrateId];
    };

    $scope.saveConcentrate = function(concentrateId, concentrate) {
      concentrate = JSON.parse( angular.toJson(concentrate));
      ( new Firebase(dvUrl + '/concentrates/' + concentrateId) ).set(concentrate);
    };
  }])
  .controller('ediblesCtrl', ['$scope', '$q', 'itemsService', 'ratingsService', function($scope, $q, itemsService, ratingsService) {
    
     // $scope.edibleDetails = itemsService.getAll('edibles', $stateParams.edibleId);
     // $scope.featuredEdibles = itemsService.getFeatured('edibles', $stateParams.edibleId);
    // Wait for both our edibles and our featured edibles to load.
    // @todo Might we need to remove duplicate entries?
    // $q.all([itemsService.getAll('edibles'), itemsService.getFeatured('edibles')])
    //   .then(function(edibleData) {
    //     edibleData.forEach(function(edibles) {
    //       edibles.sort(function(a, b) {
    //         return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
    //       });
    //     });

    //     $scope.edibles = edibleData[0];
    //     $scope.featuredEdibles = edibleData[1];
    //   });

    $q.all([itemsService.getOther('edibles'), itemsService.getFeatured('edibles')])
    .then(function(edibleData) {
      edibleData.forEach(function(edibles) {
        edibles.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.otherEdibles = edibleData[0];
      $scope.featuredEdibles = edibleData[1];
    });

    $q.all([itemsService.getOther('edibles'), itemsService.getAll('edibles')])
    .then(function(edibleData) {
      edibleData.forEach(function(edibles) {
        edibles.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.otherEdibles = edibleData[0];
      $scope.edibles = edibleData[1];
    });

  }])
  .controller('edibleDetailsCtrl', ['$scope', '$q', '$stateParams', 'itemsService', 'ratingsService', 'reviewsService', function($scope, $q, $stateParams, itemsService, ratingsService, reviewsService) {
    $scope.edibleDetails = itemsService.get('edibles', $stateParams.edibleId);
    // // @todo Exclude the current edible from the results of itemsService.getFeatured().
    // $scope.featuredEdibles = itemsService.getFeatured('edibles');
    // // @todo Exclude the current edible from the results of itemsService.getOther().
    // $scope.otherEdibles = itemsService.getOther('edibles');

    $q.all([itemsService.getOther('edibles'), itemsService.getFeatured('edibles')])
    .then(function(edibleData) {
      edibleData.forEach(function(edibles) {
        edibles.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.otherEdibles = edibleData[0];
      $scope.featuredEdibles = edibleData[1];
    });



    // $scope.showRatingChangeModal = function() {
    //   var ratingChangeModalInstance = $modal.open({
    //     size: 'md',
    //     templateUrl: 'partials/modals/ratingChange.html',
    //     controller: 'ratingChangeModalCtrl'
    //   });

    //   ratingChangeModalInstance.result
    //     .then(function(currentUser) {
    //       $scope.currentUser = currentUser;
    //       usersService.setCurrentUser(currentUser);
    //     });
    // };

    // $q.all([itemsService.reviews('reviews')]);

    // $scope.reviews = itemsService.reviews('reviews');

  }])
  .controller('ediblesManageCtrl', ['$scope', '$firebaseObject', 'dvUrl', function($scope, $firebaseObject, dvUrl) {
    $firebaseObject( new Firebase(dvUrl + '/edibles') ).$loaded()
      .then(function(edibles) {
        $scope.edibles = edibles;
        // @todo Initialize 'edible' to the first available edible.
      });

    $scope.types = [
      'Beverage',
      'Brownie',
      'Candy',
      'Chocolate',
      'Cookie',
      'Drops',
      'Mints',
      'Mixer',
      'Snack Bar',
      'Other'
    ];  

    $scope.newEdible = function() {
      $scope.edibleId = '';
      $scope.edible = {};
    };

    $scope.loadEdible = function(edibleId) {
      $scope.edible = $scope.edibles[edibleId];
    };

    $scope.saveEdible = function(edibleId, edible) {
      edible = JSON.parse( angular.toJson(edible));
      ( new Firebase(dvUrl + '/edibles/' + edibleId) ).set(edible);
    };
  }])

  /* Ratings */
  .controller('rateCtrl', ['$scope', 'dvUrl', 'usersService', 'itemsService', function($scope, dvUrl, usersService, itemsService) {

    $scope.sendRating = function(divId) {
        var rating = document.getElementById(divId).value;
        itemType = $('.pageTitle').attr('title');
        userId = $('.username').attr('title');
        itemId = $('.pageId').attr('title');
        
        if(! userId) {
          console.log('No User');
          // $showLoginModal(); //TODO - LAUNCH LOGIN MODAL
          alert("Please sign in to submit a rating.");
        } 
        // else if (! userRating) {
        //   alert("No User Rating Exists");
        //   $showRatingChangeModal();// TODO - LAUNCH RATING CHANGE MODAL
        // }
         else {
          alert('Rating Sent');
          ( new Firebase(dvUrl + '/users/' + userId + '/ratings/' + itemType + '/' + itemId) ).set(rating);
          ( new Firebase(dvUrl + '/' + itemType + '/' + itemId + '/ratings/' + userId) ).set(rating);
        };
        
    };

  }])
  /* Reviews */
  .controller('reviewsCtrl', ['$scope', '$firebaseArray', 'dvUrl', 'reviewsService',  function($scope, $firebaseArray, dvUrl, reviewsService) {
  // .controller('reviewsCtrl', ['$scope', 'reviewsService', function($scope, reviewsService) {   

    // var itemType = $('.pageTitle').attr('title');
    // var itemId = $('.pageId').attr('title');

    // $scope.reviews = function (itemType, itemId) {
    //   return $firebaseArray( new Firebase(dvUrl + '/' + itemType + '/' + itemId + '/reviews') );
    // };

    // $scope.reviews = reviewsService.getReviews('reviews');

  }])
;


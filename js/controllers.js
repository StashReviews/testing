// @todo Add error handling.

angular.module('DeViine.controllers', [])
  /*
  .controller('pageCtrl', ['$scope', 'itemType', 'itemsService', function($scope, itemType, itemsService) {
    $scope.items = itemsService.getAll(itemType);
  }])

  .controller('detailsCtrl', ['$scope', 'itemType', '$stateParams', function($scope, itemType, $stateParams) {
    $scope.itemDetails = itemsService.get(itemType, $stateParams.itemId);
  }])
  */
  .controller('DeViineCtrl', ['$scope', '$modal', 'dvUrl', 'currentUser', 'usersService', 'locationService', function($scope, $modal, dvUrl, currentUser, usersService, locationService) {
    $scope.isAdmin = usersService.isAdmin;

    $scope.getEmailHash = usersService.getEmailHash;

    $scope.currentUser = currentUser;
    usersService.setCurrentUser(currentUser);

    // @todo Note that $scope.currentName will always be one step behind the digest cycle if we pass $scope.currentUser to it.
    $scope.currentName = usersService.getName(currentUser);

    $scope.currentCity = locationService.getCurrentCity();

    // @todo Note that $scope.currentAvatar will always be one step behind the digest cycle if we pass $scope.currentUser to it.
    $scope.currentAvatar = usersService.getAvatarUrl(currentUser);

    $scope.showLoginModal = function() {
      var loginModalInstance = $modal.open({
        size: 'md',
        templateUrl: 'partials/modals/' + ( $scope.currentUser ? 'logout' : 'login' ) + '.html',
        controller: 'loginModalCtrl'
      });

      loginModalInstance.result
        .then(function(currentUser) {
          $scope.currentUser = currentUser;
          usersService.setCurrentUser(currentUser);
        });
    };

  }])
  .controller('loginModalCtrl', ['$scope', '$state', '$modalInstance', 'usersService', function($scope, $state, $modalInstance, usersService) {
    $scope.credentials = {};

    $scope.login = function(service, credentials) {
      usersService.login(service, credentials)
        .then(function(currentUser) {
          location.reload();
          $modalInstance.close(currentUser);

          $state.go('root.home');
        }, function(error) {
          console.log(error);
        });
    };

    $scope.logout = function() {
      usersService.logout();

      $modalInstance.close(null);

      $state.go('root.home');
    };

    $scope.close = function() {
      $modalInstance.dismiss();
    };
  }])
  .controller('ratingChangeModalCtrl', ['$scope', '$state', '$modalInstance', 'usersService', function($scope, $state, $modalInstance, usersService) {


    $scope.close = function() {
      $modalInstance.dismiss();
    };
  }])
  .controller('homeCtrl', ['$scope', '$q', 'itemsService', 'ratingsService', function($scope, $q, itemsService, ratingsService) {
    $scope.featuredDispensaries = itemsService.getFeatured('dispensaries');

    $scope.featuredDeals = itemsService.getFeatured('deals');

    $scope.featuredStrains = itemsService.getFeatured('strains');
    $scope.newStrains = itemsService.getNew('strains');

    $q.all([itemsService.getNew('strains'), itemsService.getFeatured('strains')])
    .then(function(strainData) {
      strainData.forEach(function(strains) {
        strains.sort(function(a, b) {
          return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
        });
      });

      $scope.newStrains = strainData[0];
      $scope.featuredStrains = strainData[1];
    });

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
  .controller('dispensaryDetailsCtrl', ['$scope', '$q', '$filter', '$stateParams', 'itemsService', 'ratingsService', 'reviewsService', 'locationService', function($scope, $q, $filter, $stateParams, itemsService, ratingsService, reviewsService, locationService) {
    
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
  .controller('dispensariesManageCtrl', ['$scope', '$filter', '$firebaseObject', 'dvUrl', function($scope, $filter, $firebaseObject, dvUrl) {
    $firebaseObject( new Firebase(dvUrl + '/dispensaries') ).$loaded()
      .then(function(dispensaries) {
        $scope.dispensaries = dispensaries;

        // @todo Initialize 'dispensaryId' and 'dispensary' to the first available dispensary.
        $scope.dispensaryId = '';
        $scope.dispensary = dispensaries[''];
      });

    $scope.newDispensary = function() {
      $scope.dispensaryId = '';
      $scope.dispensary = {};
    };

    $scope.loadDispensary = function(dispensaryId) {
      $scope.dispensary = $scope.dispensaries[dispensaryId];

      // @todo Get dispensary hours loading correctly.

      /*for(var day in $scope.dispensary['hours']) {
        if( $scope.dispensary['hours'].hasOwnProperty(day) ) {
          $scope.dispensary['hours'][day].open = new Date( $filter('date')($scope.dispensary['hours'][day].open, 'shortTime') );
          $scope.dispensary['hours'][day].close = new Date( $filter('date')($scope.dispensary['hours'][day].close, 'shortTime') );
        }
      }*/
    };

    // @todo Don't forget to save the dispensary's coordinates to '/locations/<id>'.
    $scope.saveDispensary = function(dispensaryId, dispensary) {
      // @see http://stackoverflow.com/a/23656919
      // (Seems like a pretty hack-ish way to remove the '$$hashKey' key.)
      dispensary = JSON.parse( angular.toJson(dispensary) );

      // @todo Remove this check once we're confident that everything works correctly.
      if( !( dispensaryId ) ) {
        dispensaryId = 'test';
      }

      for(var day in dispensary['hours']) {
        if( dispensary['hours'].hasOwnProperty(day) ) {
          dispensary['hours'][day].open = $filter('date')(dispensary['hours'][day].open, 'shortTime');
          dispensary['hours'][day].close = $filter('date')(dispensary['hours'][day].close, 'shortTime');
        }
      }

      /*
        This is equivalent to the code that follows.  (Strictly for educational purposes.)

        if(dispensary.$id) {
          ( new Firebase(dvUrl + '/dispensaries/' + dispensary.$id) ).set(dispensary);
        } else {
          ( new Firebase(dvUrl + '/dispensaries/' + dispensaryId) ).set(dispensary);
        }
      */

      ( new Firebase(dvUrl + '/dispensaries/' + dispensaryId) ).set(dispensary);
    };





    $scope.saveMenu = function(dispensaryId, menu) {
      ( new Firebase(dvUrl + '/dispensaries/' + dispensaryId + '/menu') ).set(menu);
    };






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
    // Wait for both our strains and our featured strains to load.
    // @todo Might we need to remove duplicate entries?
    $q.all([itemsService.getAll('strains'), itemsService.getFeatured('strains')])
      .then(function(strainData) {
        strainData.forEach(function(strains) {
          strains.sort(function(a, b) {
            return ratingsService.getAvgRating(b.ratings) - ratingsService.getAvgRating(a.ratings);
          });
        });

        $scope.strains = strainData[0];
        $scope.featuredStrains = strainData[1];
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


    $scope.showRatingChangeModal = function() {
      var ratingChangeModalInstance = $modal.open({
        size: 'md',
        templateUrl: 'partials/modals/ratingChange.html',
        controller: 'ratingChangeModalCtrl'
      });

      ratingChangeModalInstance.result
        .then(function(currentUser) {
          $scope.currentUser = currentUser;
          usersService.setCurrentUser(currentUser);
        });
    };

    // $q.all([itemsService.reviews('reviews')]);

    // $scope.reviews = itemsService.reviews('reviews');

  }])
  .controller('strainsManageCtrl', ['$scope', '$firebaseObject', 'dvUrl', function($scope, $firebaseObject, dvUrl) {
    $firebaseObject( new Firebase(dvUrl + '/strains') ).$loaded()
      .then(function(strains) {
        $scope.strains = strains;
        // @todo Initialize 'strain' to the first available strain.
      });

    $scope.flavors = [
      'Apple',
      'Apricot',
      'Blueberry',
      'Blue Cheese',
      'Butter',
      'Cheese',
      'Chestnut',
      'Cedar',
      'Coffee',
      'Diesel',
      'Flowery',
      'Fruity',
      'Grape',
      'Grapefruit',
      'Honey',
      'Lavender',
      'Lemon',
      'Lime',
      'Mango',
      'Menthol',
      'Mint',
      'Orange',
      'Peach',
      'Pear',
      'Pepper',
      'Pine',
      'Plum',
      'Pineapple',
      'Rose',
      'Sage',
      'Sour',
      'Skunk',
      'Strawberry',
      'Sweet',
      'Tea',
      'Tobacco',
      'Vanilla',
      'Violet'
    ];

    $scope.positiveEffects = [
      'Aroused',
      'Creative',
      'Energetic',
      'Euphoric',
      'Focused',
      'Giggly',
      'Happy',
      'Hungry',
      'Relaxed',
      'Sleepy',
      'Tingly',
      'Uplifted'
    ];

    $scope.negativeEffects = [
      'Anxious',
      'Dizzy',
      'Dry Eyes',
      'Dry Mouth',
      'Headache',
      'Paranoid',
      'Sleepy',
      'Talkative'
    ];

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

  .controller('reviewsCtrl', ['$scope', '$firebaseArray', 'dvUrl', 'reviewsService',  function($scope, $firebaseArray, dvUrl, reviewsService) {
  // .controller('reviewsCtrl', ['$scope', 'reviewsService', function($scope, reviewsService) {   

    // $scope.reviews = [ 
    //   { 
    //     author: 'The Book of Trees', 
    //     text: 19, 
    //     date: new Date('2014', '03', '08'), 
    //     avatar: 'img/the-book-of-trees.jpg' 
    //   }, 
    //   { 
    //     author: 'Program or be Programmed', 
    //     text: 8, 
    //     date: new Date('2013', '08', '01'), 
    //     avatar: 'img/program-or-be-programmed.jpg' 
    //   } 
    // ];

    // var itemType = $('.pageTitle').attr('title');
    // var itemId = $('.pageId').attr('title');

    // $scope.reviews = function (itemType, itemId) {
    //   return $firebaseArray( new Firebase(dvUrl + '/' + itemType + '/' + itemId + '/reviews') );
    // };

    // $scope.reviews = reviewsService.getReviews('reviews');


  }])
;


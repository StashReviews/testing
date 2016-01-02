angular.module('Stash', ['Stash.config', 'Stash.services', 'Stash.controllers', 'Stash.directives', 'ui.router', 'ui.bootstrap', 'firebase'])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    // @see https://www.firebase.com/docs/web/libraries/angular/guide.html#section-routes
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      if(error === 'AUTH_REQUIRED') {
        $state.go('root.home');
      }
    });
  }])
  .run(["$rootScope", "$anchorScroll" , function ($rootScope, $anchorScroll) {
    $rootScope.$on("$locationChangeSuccess", function() {
                $anchorScroll();
    });
  }])
  .config(function($stateProvider, $urlRouterProvider) {
    // $locationProvider
    //   .html5Mode(false)
    //   .hashPrefix('!');

    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
        templateUrl: 'templates/page.html',
        controller: 'StashCtrl',
        resolve: {
          currentUser: ['$firebaseAuth', 'dvUrl', function($firebaseAuth, dvUrl) {
            return $firebaseAuth( new Firebase(dvUrl) ).$waitForAuth();
          }]
        }
      })
      /*
      .state('root.items', {
        url: '/:itemType', // @todo Determine whether or not this would match '/'.
        templateUrl: function($stateParams) {
          return 'pages/' + $stateParams.itemType + '.html'
        },
        controller: 'pageCtrl'
      })
      .state('root.itemDetails', {
        url: '/:itemType/:itemId',
        templateUrl: function($stateParams) {
          return 'pages/details' + $stateParams.itemType + 'Details.html'
        },
        controller: 'detailsCtrl'
      })
      */
      // dynamic pages (/i.e./ those that require a controller)
      .state('root.ratings', {
        templateUrl: 'partials/ratings.html',
        controller: 'rateCtrl',
        resolve: {
          currentUser: ['$firebaseAuth', 'dvUrl', function($firebaseAuth, dvUrl) {
            return $firebaseAuth( new Firebase(dvUrl) ).$requireAuth();
          }]
        }
      })
      .state('root.home', {
        url: '/',
        templateUrl: 'pages/home.html',
        controller: 'homeCtrl'
      })
      // signup page
      .state('root.signup', {
        url: '/signup',
        templateUrl: 'pages/signup.html',
        controller: 'signupCtrl'
      })
      // signin page
      .state('root.signin', {
        url: '/signin',
        templateUrl: 'pages/signin.html',
        controller: 'signinCtrl'
      })
      // user pages
      .state('root.users', {
        url: '/users',
        templateUrl: 'pages/users.html',
        controller: 'usersCtrl'
      })
      .state('root.userProfile', {
        url: '/users/:userId',
        templateUrl: 'pages/users/userProfile.html',
        controller: 'userProfileCtrl'
      })
      .state('root.userBuddies', {
        url: '/users/:userId/buddies',
        templateUrl: 'pages/users/userBuddies.html',
        controller: 'userBuddiesCtrl'
      })
      .state('root.userReviews', {
        url: '/users/:userId/reviews',
        templateUrl: 'pages/users/userReviews.html',
        controller: 'userReviewsCtrl'
      })
      // business pages
      .state('root.businesses', {
        url: '/businesses',
        templateUrl: 'pages/businesses.html',
        controller: 'businessesCtrl'
      })
      .state('root.businessProfile', {
        url: '/businesses/:businessId',
        templateUrl: 'pages/businesses/businessProfile.html',
        controller: 'businessProfileCtrl'
      })
      .state('root.managebusiness', {
        url: '/manage/business',
        templateUrl: 'pages/manage/businessCMS.html',
        controller: 'businessManageCtrl',
        resolve: {
          currentUser: ['$firebaseAuth', 'dvUrl', function($firebaseAuth, dvUrl) {
            return $firebaseAuth( new Firebase(dvUrl) ).$requireAuth();
          }]
        }
      })
      // strains
      .state('root.strains', {
        url: '/strains',
        templateUrl: 'pages/strains.html',
        controller: 'strainsCtrl'
      })
      .state('root.strainDetails', {
        url: '/strains/:strainId',
        templateUrl: 'pages/details/strainDetails.html',
        controller: 'strainDetailsCtrl'
      })
      .state('root.manageStrains', {
        url: '/manage/strains',
        templateUrl: 'pages/manage/strains.html',
        controller: 'strainsManageCtrl',
        resolve: {
          currentUser: ['$firebaseAuth', 'dvUrl', function($firebaseAuth, dvUrl) {
            return $firebaseAuth( new Firebase(dvUrl) ).$requireAuth();
          }]
        }
      })
      // concentrates
      .state('root.concentrates', {
        url: '/concentrates',
        templateUrl: 'pages/concentrates.html',
        controller: 'concentratesCtrl'
      })
      .state('root.concentrateDetails', {
        url: '/concentrates/:concentrateId',
        templateUrl: 'pages/details/concentrateDetails.html',
        controller: 'concentrateDetailsCtrl'
      })
      .state('root.manageConcentrates', {
        url: '/manage/concentrates',
        templateUrl: 'pages/manage/concentrates.html',
        controller: 'concentratesManageCtrl',
        resolve: {
          currentUser: ['$firebaseAuth', 'dvUrl', function($firebaseAuth, dvUrl) {
            return $firebaseAuth( new Firebase(dvUrl) ).$requireAuth();
          }]
        }
      })
      // edibles
      .state('root.edibles', {
        url: '/edibles',
        templateUrl: 'pages/edibles.html',
        controller: 'ediblesCtrl'
      })
      .state('root.edibleDetails', {
        url: '/edibles/:edibleId',
        templateUrl: 'pages/details/edibleDetails.html',
        controller: 'edibleDetailsCtrl'
      })
      .state('root.manageEdibles', {
        url: '/manage/edibles',
        templateUrl: 'pages/manage/edibles.html',
        controller: 'ediblesManageCtrl',
        resolve: {
          currentUser: ['$firebaseAuth', 'dvUrl', function($firebaseAuth, dvUrl) {
            return $firebaseAuth( new Firebase(dvUrl) ).$requireAuth();
          }]
        }
      })
      // static pages
      .state('root.terms', {
        url: '/terms',
        templateUrl: 'pages/static/terms.html'
      })
      .state('root.privacy', {
        url: '/privacy',
        templateUrl: 'pages/static/privacy.html'
      })
      .state('root.brandassets', {
        url: '/brandassets',
        templateUrl: 'pages/static/brandassets.html'
      })
      .state('root.stateyourlove', {
        url: '/stateyourlove',
        templateUrl: 'pages/static/stateyourlove.html'
      })
      .state('root.faq', {
        url: '/faq',
        templateUrl: 'pages/static/faq.html'
      });

    $urlRouterProvider.otherwise('/');

  });
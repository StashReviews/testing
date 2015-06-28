angular.module('DeViine', ['DeViine.config', 'DeViine.services', 'DeViine.controllers', 'DeViine.directives', 'ui.router', 'ui.bootstrap', 'firebase'])
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
        controller: 'DeViineCtrl',
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
      // user pages
      // .state('root.users', {
      //   url: '/users',
      //   templateUrl: 'pages/users.html',
      //   controller: 'usersCtrl'
      // })
      .state('root.userProfile', {
        url: '/users/:userId',
        templateUrl: 'pages/users/userProfile.html',
        controller: 'userProfileCtrl'
      })
      // dispensaries
      .state('root.dispensaries', {
        url: '/dispensaries',
        templateUrl: 'pages/dispensaries.html',
        controller: 'dispensariesCtrl'
      })
      .state('root.dispensaryDetails', {
        url: '/dispensaries/:dispensaryId',
        templateUrl: 'pages/details/dispensaryDetails.html',
        controller: 'dispensaryDetailsCtrl'
      })
      .state('root.manageDispensaries', {
        url: '/manage/dispensaries',
        templateUrl: 'pages/manage/dispensaries.html',
        controller: 'dispensariesManageCtrl',
        resolve: {
          currentUser: ['$firebaseAuth', 'dvUrl', function($firebaseAuth, dvUrl) {
            return $firebaseAuth( new Firebase(dvUrl) ).$requireAuth();
          }]
        }
      })
      // deals
      .state('root.deals', {
        url: '/deals',
        templateUrl: 'pages/deals.html',
        controller: 'dealsCtrl'
      })
      .state('root.dealDetails', {
        url: '/deals/:dealId',
        templateUrl: 'pages/details/dealDetails.html',
        controller: 'dealDetailsCtrl'
      })
      .state('root.manageDeals', {
        url: '/manage/deals',
        templateUrl: 'pages/manage/deals.html',
        controller: 'dealsManageCtrl',
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
      });

    $urlRouterProvider.otherwise('/');

  });
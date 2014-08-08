'use strict';

angular.module('mean.projectreel').config(['$stateProvider',
  function($stateProvider) {

    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'projectreel/views/index.html'
      })
      .state('projectreel example page', {
        url: '/projectreel/example',
        templateUrl: 'projectreel/views/index.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create project', {
        url: '/projectreel/create',
        templateUrl: 'projectreel/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);

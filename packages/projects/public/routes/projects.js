'use strict';

angular.module('mean.projects').config(['$stateProvider',
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
        templateUrl: 'projects/views/index.html',
      })
      .state('all projects', {
        url: '/projects',
        templateUrl: 'projects/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create project', {
        url: '/projects/create',
        templateUrl: 'projects/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit project', {
        url: '/projects/:projectId/edit',
        templateUrl: 'projects/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('project by id', {
        url: '/projects/:projectId',
        templateUrl: 'projects/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);

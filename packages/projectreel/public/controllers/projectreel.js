'use strict';

angular.module('mean.projectreel').controller('ProjectreelController', ['$scope', 'Global', 'Projectreel',
  function($scope, Global, Projectreel) {
    $scope.global = Global;
    $scope.package = {
      name: 'projectreel'
    };
  }
]);

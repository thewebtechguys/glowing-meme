'use strict';

angular.module('mean.projects').controller('ProjectsController', ['$scope', 'Global', 'Projects',
  function($scope, Global, Projects) {
    $scope.global = Global;

    $scope.hasAuthorization = function(project) {
      if (!project || !project.user) return false;
      return $scope.global.isAdmin || project.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var project = new Projects({
          name: this.name,
          image: this.image,
	  link: this.link
        });
        project.$save(function(response) {
          $location.path('projects/' + response._id);
        });

        this.name = '';
        this.image = '';
        this.link = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(project) {
      if (project) {
        project.$remove();

        for (var i in $scope.projects) {
          if ($scope.projects[i] === project) {
            $scope.projects.splice(i, 1);
          }
        }
      } else {
        $scope.project.$remove(function(response) {
          $location.path('projects');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var project = $scope.project;
        if (!project.updated) {
          project.updated = [];
        }
        project.updated.push(new Date().getTime());

        project.$update(function() {
          $location.path('projects/' + project._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Projects.query(function(projects) {
        $scope.projects = projects;
      });
    };

    $scope.findOne = function() {
      Projects.get({
        projectId: $stateParams.projectId
      }, function(project) {
        $scope.project = project;
      });
    };
  }
]);

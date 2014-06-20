var haloaaApp = angular.module('HaloaaApp', ['ngRoute']);

// Configure router for the app
haloaaApp.config(function($routeProvider) {
  $routeProvider
  
    // Main provider
    .when('/', {
      templateUrl: 'views/MainView.html',
      controller: 'mainController'
    })
  
    // Song provider
    .when('/songs', {
      templateUrl: 'views/SongsView.html',
      controller: 'songsController'
    });
});

haloaaApp.controller('mainController', function($scope, $rootScope) {
  console.log("in main controller");
  $rootScope.ToggleSongsRef = '#/songs';
  $scope.ButtonIcon = "fa-music";
});

haloaaApp.controller('songsController', function($scope, $rootScope) {
  console.log("SONGS SONGS");
  $rootScope.ToggleSongsRef = '#';
  $rootScope.ButtonIcon = "fa-music";
});
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

haloaaApp.controller('mainController', function($scope) {
  console.log("in main controller");
});

haloaaApp.controller('songsController', function($scope) {
  console.log("SONGS SONGS");
});
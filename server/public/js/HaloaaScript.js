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

haloaaApp.controller('mainController', function($scope, $rootScope, $http) {
  console.log("in main controller");
  $rootScope.ToggleSongsRef = '#/songs';
  $rootScope.ButtonIcon = "fa-music";

  $scope.startRecording = function() {
    window.startRecording();
  };

  $scope.stopRecording = function() {
    window.stopRecording(function(blob) {
      var reader = new FileReader();

      reader.onload = function(event) {
        $http.post("/upload", { data: event.target.result }).then($scope.songUploaded);
      }

      reader.readAsDataURL(blob);
    });
  }

  $scope.songUploaded = function() {
    alert('song uploaded!');
  };
});

haloaaApp.controller('songsController', function($scope, $rootScope) {
  console.log("SONGS SONGS");
  $rootScope.ToggleSongsRef = '#';
  $rootScope.ButtonIcon = "fa-microphone";
});

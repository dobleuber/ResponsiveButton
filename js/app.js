angular.module('testApp', ['ui.router', 'testApp.controllers', 'testApp.directives'])
.run(function () {
})
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
 .state('home', {
   url: "/home",
   templateUrl: "partials/home.html",
   controller: 'homeCtrl'
 });

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
});


angular.module('testApp.controllers', []);
angular.module('testApp.directives', []);
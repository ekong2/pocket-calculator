angular.module('CalculatorApp', [
  'CalculatorApp.calculator',
  'ngRoute'
  ])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/calculator/calculator.html',
      controller: 'CalculatorController'
    })
    .otherwise({ 
      redirectTo: '/' 
    });
});
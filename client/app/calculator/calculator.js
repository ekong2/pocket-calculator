angular.module('CalculatorApp.calculator', [])

.controller('CalculatorController', function ($scope, MathService) {
  // Calculator logic
  $scope.screenSizeLimit = 9;
  $scope.currentDisplay = "0";
  $scope.currentOperation = null;
  $scope.isDecimal = false;
  $scope.resetScreen = true;
  $scope.savedNumber = null;
  $scope.repeatValue = null;

  $scope.reset = function(hardReset){
  	$scope.currentDisplay = "0";
  	$scope.resetScreen = true;
  	if (hardReset){
  		$scope.repeatValue = null;
  		$scope.savedNumber = null;
  	}
  }

  $scope.negativePositiveSwitch = function(){
  	$scope.calculate($scope.currentDisplay, '-1', 'x');
  }

  $scope.percentage = function(){
  	$scope.calculate($scope.currentDisplay, '100', '/');
  }

  $scope.operationClicked = function(operation){
  	if (!$scope.resetScreen){
  		$scope.resetScreen = true;
  	}
  	$scope.savedNumber = $scope.currentDisplay;
  	$scope.currentOperation = operation;
  	$scope.repeatValue = null;
  };

  $scope.numberClicked = function(number){
  	if (($scope.currentDisplay === "0" && number !== '.') || ($scope.resetScreen && number !== '.')) {
  		$scope.resetScreen = false;
  		$scope.currentDisplay = number;
  	} else {
  		if ($scope.currentDisplay.length < $scope.screenSizeLimit){
  			$scope.currentDisplay += number;
  		}
  	}
  };

  $scope.equalsClicked = function(){
  	if ($scope.repeatValue !== null){
  		$scope.calculate($scope.savedNumber, $scope.repeatValue, $scope.currentOperation);
  	} else {
  		$scope.calculate($scope.savedNumber, $scope.currentDisplay, $scope.currentOperation);
  	}
  }

  $scope.calculate = function(left, right, operation){
  	if (left === null || right === null || operation === null) return;

  	var result;
  	if (operation === '+'){
  		result = MathService.add(+left, +right);
  	} else if (operation === '-'){
  		result = MathService.subtract(+left, +right);
  	} else if (operation === '/'){
  		result = MathService.divide(+left, +right);
  	} else {
  		result = MathService.multiply(+left, +right);
  	}
  	$scope.savedNumber = result;
  	$scope.repeatValue = right;
  	$scope.currentDisplay = result.toString();
  	$scope.resetScreen = true;
  }
});

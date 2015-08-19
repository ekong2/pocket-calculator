angular.module('CalculatorApp.calculator', [])

.controller('CalculatorController', function ($scope, MathService) {
  
  // Screen size
  $scope.screenSizeLimit = 9;

  //Boolean to determine whether display number should be replaced
  $scope.resetScreen = true;

  //Left operand
  $scope.savedNumber = null;

  //Cached right operand
  $scope.repeatValue = null;

  $scope.currentDisplay = "0";
  $scope.currentOperation = null;

  $scope.reset = function(){

  	//Check whether this is a hard reset or not
  	if ($scope.currentDisplay === "0" && $scope.resetScreen){
  		$scope.repeatValue = null;
  		$scope.savedNumber = null;
  	}

  	//Clear the current values
  	$scope.currentDisplay = "0";
  	$scope.resetScreen = true;
  }

  //Switch from positive to negative and vice versa
  $scope.negativePositiveSwitch = function(){
  	$scope.calculate($scope.currentDisplay, '-1', 'x');
  }

  //Return number as a percentage
  $scope.percentage = function(){
  	$scope.calculate($scope.currentDisplay, '100', '/');
  }

  $scope.raiseToThePowerOf = function(number){
  	$scope.calculate($scope.currentDisplay, number, '^');
  }

  $scope.divideByX = function(){
  	$scope.calculate('1', $scope.currentDisplay, '/');
  }

  $scope.factorial = function(){
  	$currentDisplay = MathService.factorial(+$scope.currentDisplay);
  }

  $scope.operationClicked = function(operation){

  	//Tick the resetScreen boolean so display number can be replaced
  	if (!$scope.resetScreen){
  		$scope.resetScreen = true;
  	}

  	//Save the current number to become the left operand
  	$scope.savedNumber = $scope.currentDisplay;
  	$scope.currentOperation = operation;
  	$scope.repeatValue = null;
  };

  $scope.numberClicked = function(number){

  	//Determine whether we replace the number or concatenate the character
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

  	//If we repeatedly click on equals, use cached value
  	if ($scope.repeatValue !== null){
  		$scope.calculate($scope.savedNumber, $scope.repeatValue, $scope.currentOperation);
  	} else {
  		$scope.calculate($scope.savedNumber, $scope.currentDisplay, $scope.currentOperation);
  	}
  }

  $scope.calculate = function(left, right, operation){

  	//We haven't formed a valid equation to calculate yet
  	if (left === null || right === null || operation === null) return;

  	//Determine what operation to use to get results
  	var result;
  	if (operation === '+'){
  		result = MathService.add(+left, +right);
  	} else if (operation === '-'){
  		result = MathService.subtract(+left, +right);
  	} else if (operation === '/'){
  		result = MathService.divide(+left, +right);
  	} else if (operation === '^'){
  		result = MathService.exponents(+left, +right);
  	} else if (operation === '^*'){
  		result = MathService.exponents(+left, MathService.divide(1, +right));
  	} else {
  		result = MathService.multiply(+left, +right);
  	}

  	//Cache the value that we could potentially reuse
  	$scope.savedNumber = result;
  	$scope.repeatValue = right;

  	//Cisplay result, switch resetScreen bool
  	$scope.currentDisplay = result.toString();
  	$scope.resetScreen = true;
  }
});

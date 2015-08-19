angular.module('CalculatorApp.mathServices',[])
.service('MathService', function(){

    this.add = function(a, b) {
        return (a+b);
    };

    this.subtract = function(a, b) {
        return (a-b);
    };

    this.multiply = function(a, b) {
        return (a*b);
    };

    this.divide = function(a, b) {
        return (a/b).toFixed(2);
    };

    this.exponents = function(a, b) {
    	return Math.pow(a,b);
    }

    this.factorial = function(n){
    	if (n < 0) return "Error";
    	if (n === 1 || n === 0) return 1;
    	var result = 1;
    	for (var i = 1; i <= n; i++){
    		result *= i;
    	}
    	return result;
    }
});
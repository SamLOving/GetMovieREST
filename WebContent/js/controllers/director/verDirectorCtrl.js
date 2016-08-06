var app = angular.module("getmovieApp");
app.controller("verDirectorCtrl", function($scope, $route, $filter,
		serviceDirector, $timeout) {
	$scope.Director = {
		iddirector : 0,
		nombredirector : "",
		genero : "",
		nacimiento : "",
		fotodirector : ""
	}
	$scope.buscar = function() {
		console.log("Current Params: " + $route.current.params.id);
		serviceDirector.buscarDirector($route.current.params.id, function(
				director) {
			if (director == "") {
				$scope.$location.path('/Director/home').replace();
			} else {
				$scope.Director.nombredirector = director.nombredirector;
				$scope.Director.genero = director.genero;
				$scope.Director.nacimiento = new Date(director.nacimiento);
				$scope.Director.fotodirector = director.fotodirector;
				$scope.Director.iddirector = director.iddirector;
			}
		}, function() {
			console.log("error " + msgError);
			$scope.addAlert("danger",
					"Error Interno! Consulte con el administrador.");
		})
	}
});
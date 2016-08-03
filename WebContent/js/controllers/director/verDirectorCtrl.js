var app = angular.module("getmovieApp");
app.controller("verDirectorCtrl", function($scope, $rootScope, $route, $location, serviceActor) {
	$scope.Director = {
		iddirector : 0,
		nombredirector : "",
		genero : "",
		nacimiento : "",
		fotodirector : ""
	}
	$scope.buscar = function() {
		console.log("Current Params: " + $route.current.params.id);
		serviceActor.buscarActor($route.current.params.id, function(actor){
			if (actor == ""){
				$scope.$location.path('/Actor/home').replace();
			}else {
				$scope.actor.nombreactor = actor.nombreactor;
				$scope.actor.genero = actor.genero;
				$scope.actor.nacimiento = nacimiento;
				$scope.actor.oscars = actor.oscars;
				$scope.actor.fotoactor = actor.fotoactor;
				$scope.actor.idactor = actor.idactor;
			}
		}, function(){
			console.log("error " + msgError);
			$scope.addAlert("danger","Error Interno! Consulte con el administrador.");
		})}
});
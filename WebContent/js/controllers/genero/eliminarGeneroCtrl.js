var app = angular.module("getmovieApp");

app.controller("eliminarGeneroCtrl", function($scope, $filter, $location, $route, serviceGenero){
	console.log($route.current.params.idgenero);
	
	$scope.init = function() {
		$scope.eliminar();
	}
	
	$scope.eliminar = function () {
		console.log($route.current.params.idgenero);
        serviceGenero.eliminarGenero($route.current.params.idgenero, function (eliminarGenero) {
            console.log("Genero eliminado con exito ");
            $scope.$location.path('/Genero/administrar').replace();
        }, function (mensajeError) {
            $scope.error = mensajeError;
        })
    };
});
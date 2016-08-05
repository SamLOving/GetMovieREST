var app = angular.module("getmovieApp");

app.controller("eliminarProductoraCtrl", function($scope, $filter, $location,$route, serviceProductora) {
	console.log($route.current.params.idproductora);

	$scope.init = function() {
		$scope.eliminar();
	}

	$scope.eliminar = function() {
		console.log($route.current.params.idproductora);
		serviceProductora.eliminarProductora($route.current.params.idproductora, function(eliminarProductora) {
			console.log("Productora eliminada con exito ");
			$scope.$location.path('/Productora/administrar').replace();
		}, function(mensajeError) {
			$scope.error = mensajeError;
		})
	};
});
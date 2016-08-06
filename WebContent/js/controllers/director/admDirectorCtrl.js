var app = angular.module("getmovieApp");

app.controller("controllerDirector", function($scope, $filter, $route,
		serviceDirector, $timeout) {
	$scope.execRegistrar = false
	$scope.msgBackgroundError = {
		'background-color' : '#E57373'
	};
	$scope.nombre = ""

	$scope.listar = function() {
		serviceDirector.listarDirector($scope.nombre, function(listaDirector) {
			console.log("Lista de Directores " + listaDirector);
			$scope.directores = listaDirector;
		}, function(mensajeError) {
			$scope.error = mensajeError;
		})
	}
	$scope.eliminar = function(id) {
		serviceDirector.eliminarDirector(id, function() {
			console.log("Director eliminado con exito ");

			console.log("exito ");
			$scope.addAlert("success", "Éxito! al borrar el director");
			$timeout(function() {
				for (var i = 0; i < $scope.directores.length; i++) {
					if ($scope.directores[i].iddirector == id) {
						$scope.directores.splice(i, 1);
					}
				}
			}, 1000);

		}, function(mensajeError) {
			$scope.error = mensajeError;
		})
	};
	$scope.alerts = [];
	$scope.addAlert = function(tipo, mensaje) {
		$scope.alerts.push({
			type : tipo,
			msg : mensaje
		});
	};
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
});
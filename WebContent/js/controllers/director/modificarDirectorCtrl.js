var app = angular.module("getmovieApp");
app.controller("modificarDirectorCtrl", function($scope, $route, $filter,
		serviceDirector, $timeout) {
	$scope.execRegistrar = false
	$scope.msgBackgroundError = {
		'background-color' : '#E57373'
	};
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
		}, function(msgError) {
			console.log("error " + msgError);
			$scope.addAlert("danger",
					"Error Interno! Consulte con el administrador.");
		})
	}
	$scope.modificar = function() {
		$scope.execRegistrar = true;
		$scope.alerts = [];
		if ($scope.Director.nombredirector == ""
				|| $scope.Director.genero == ""
				|| $scope.Director.nacimiento == "") {
			$scope.addAlert('danger', 'Error! Complete los campos vacíos.')
		}
		if (angular.isUndefined($scope.Director.nombredirector)
				|| angular.isUndefined($scope.Director.genero)
				|| angular.isUndefined($scope.Director.nacimiento)) {
			$scope.addAlert('danger',
					'Error! Ingrese los campos correctamente.')
		}
		if ($scope.alerts.length == 0) {
			$scope.Director.nacimiento = $filter('date')(
					$scope.Director.nacimiento, "yyyy-MM-dd");
			serviceDirector.modificarDirector($scope.Director, function(
					response) {
				console.log("exito al modificar director");
				$scope.addAlert("success", "Éxito! al modificar director");
				$timeout(function() {
					$scope.$location.path('/Director/home').replace();
				}, 2000);

			}, function(mensajeError) {
				console.log(" error Actor modificando ctrl")
				$scope.addAlert("danger", "Error! al modificar el director");
			})
		}
	}
	$scope.alerts = [];
	$scope.addAlert = function(tipo, mensaje) {
		$scope.alerts.push({
			type : tipo,
			msg : mensaje
		});
	};
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	}
});
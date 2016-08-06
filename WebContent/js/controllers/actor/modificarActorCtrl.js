var app = angular.module("getmovieApp");
app.controller("modificarActorCtrl", function($scope, $rootScope, $route,
		$filter, serviceActor, $timeout) {
	$scope.execRegistrar = false
	$scope.msgBackgroundError = {
		'background-color' : '#E57373'
	};
	$scope.actor = {
		idactor : 0,
		nombreactor : "",
		genero : "",
		nacimiento : "",
		oscars : "",
		fotoactor : ""
	}
	$scope.buscar = function() {
		if (angular.isUndefined($rootScope.usuario.isadmin)) {
			$scope.$location.path('/Home').replace();
		} else {
			console.log("Current Params: " + $route.current.params.id);
			serviceActor.buscarActor($route.current.params.id, function(actor) {
				if (actor == "") {
					$scope.$location.path('/Actor/home').replace();
				} else {
					$scope.actor.nombreactor = actor.nombreactor;
					$scope.actor.genero = actor.genero;
					$scope.actor.nacimiento = new Date(actor.nacimiento);
					$scope.actor.oscars = actor.oscars;
					$scope.actor.fotoactor = actor.fotoactor;
					$scope.actor.idactor = actor.idactor;
				}
			}, function() {
				console.log("error " + msgError);
				$scope.addAlert("danger",
						"Error Interno! Consulte con el administrador.");
			})
		}
	}

	$scope.modificar = function() {
		if (angular.isUndefined($rootScope.usuario.isadmin)) {
			$scope.$location.path('/Home').replace();
		} else {
			$scope.execRegistrar = true;
			$scope.alerts = [];
			if ($scope.actor.nombreactor == "" || $scope.actor.genero == ""
					|| $scope.actor.nacimiento == ""
					|| $scope.actor.oscars == "") {
				$scope.addAlert('danger', 'Error! Complete los campos vacíos.')
			}
			if (angular.isUndefined($scope.actor.nombreactor)
					|| angular.isUndefined($scope.actor.genero)
					|| angular.isUndefined($scope.actor.nacimiento)
					|| angular.isUndefined($scope.actor.oscars)) {
				$scope.addAlert('danger',
						'Error! Ingrese los campos correctamente.')
			}
			if ($scope.alerts.length == 0) {
				$scope.actor.nacimiento = $filter('date')($scope.actor.nacimiento,"yyyy-MM-dd")
				serviceActor.modificarActor($scope.actor, function(response) {
					console.log("exito al modificar" );
					$scope.addAlert("success", "Éxito! al modificar el actor");
					$timeout(function() {
						$scope.$location.path('/Actor/home').replace();
					}, 2000);

				}, function(mensajeError) {
					console.log(" error Actor modificando ctrl "+mensajeError.danger)
					$scope.addAlert("danger", "Error! al modificar el acotr.");
				})
			}
		}
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
	}
});
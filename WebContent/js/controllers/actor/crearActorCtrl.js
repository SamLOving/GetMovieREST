var app = angular.module("getmovieApp");
app.controller("crearActorCtrl", function($rootScope, $scope, $filter,
		$timeout, serviceActor) {
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

	$scope.crear = function() {
		if (angular.isUndefined($rootScope.usuario.isadmin)) {
			$scope.$location.path('/Home').replace();
		} else {
			$scope.actor.nacimiento = $filter('date')($scope.actor.nacimiento, "yyyy-MM-dd")
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
				serviceActor.crearActor($scope.actor, function(response) {
					console.log("exito " + response.success);
					$scope.addAlert("success", "Éxito! al crear el actor" );
					$timeout(function() {
						$scope.$location.path('/Actor/home').replace();
					}, 2000);

				}, function(msgError) {
					console.log("error " + msgError);
					$scope.addAlert("danger","Error! al crear el actor.");
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
	};

});
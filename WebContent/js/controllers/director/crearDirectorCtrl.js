var app = angular.module("getmovieApp");
app.controller("crearDirectorCtrl", function($scope, $filter, serviceDirector, $timeout, $rootScope) {
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
	$scope.crear = function() {
		if (angular.isUndefined($rootScope.usuario.isadmin)) {
			$scope.$location.path('/Home').replace();
		} else {

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
				$scope.Director.nacimiento = $filter('date')($scope.Director.nacimiento, "yyyy-MM-dd");
				serviceDirector.crearDirector($scope.Director, function(response) {
					console.log("exito ");
					$scope.addAlert("success", "Éxito! al crear el director" );
					$timeout(function() {
						$scope.$location.path('/Director/home').replace();
					}, 2000);

				}, function(mensajeError) {
					console.log("Error ctrl Director");
					$scope.addAlert("danger", "Error! al crear el director");
				})
			}
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
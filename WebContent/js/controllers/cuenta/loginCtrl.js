var app = angular.module("getmovieApp");

app.controller("loginCtrl", function($rootScope, $scope, admCuentaSrv) {
	$scope.execLoggin = false
	$scope.msgBackgroundError = {
			'background-color': '#E57373'
	};
	
	$scope.loggin = function() {
		$scope.execLoggin = true;
		if ($scope.usuario.correousr == "" || $scope.usuario.claveusr == "" 
			|| angular.isUndefined($scope.usuario.claveusr) || angular.isUndefined($scope.usuario.correousr)) {
			$scope.alerts = [];
			$scope.addAlert("danger","Error! Ingrese sus credencialesc correctamente.");
		} else {
			admCuentaSrv.logginSrv($scope.usuario, function(loggin) {
				console.log("exito " + loggin);
				if (loggin == true){
					$scope.setInfoUser();
					//$window.sessionStorage["userInfo"] = JSON.stringify($rootScope.usuario);
				    $scope.$location.path('/Home').replace();
				} else {
					$scope.alerts = [];
					$scope.addAlert("danger","Error! Usuario y/o contraseña incorrectos.");
				}
			}, function(msgError) {
				console.log("error " + msgError);
				$scope.alerts = [];
				$scope.addAlert("danger","Error Interno! Consulte con el administrador.");
			})
		}
	}
	
	$scope.setInfoUser = function() {
		admCuentaSrv.findUsrSrv($scope.usuario.correousr, function(usr) {
			console.log("exito");
			$rootScope.usuario.correousr = usr.correousr;
			$rootScope.usuario.claveusr = "";
			$rootScope.usuario.estadousr = 1;
			$rootScope.usuario.isadmin = usr.isadmin;
			$rootScope.usuario.nombreusr = usr.nombreusr;
		}, function(msgError) {
			console.log("error");
			$scope.alerts = [];
			$scope.addAlert("danger","Error Interno! Consulte con el administrador.");
		})
	}

	$scope.alerts = [];

	$scope.addAlert = function(tipo, mensaje) {
		$scope.alerts.push({
			type: tipo,
			msg : mensaje
		});
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
});

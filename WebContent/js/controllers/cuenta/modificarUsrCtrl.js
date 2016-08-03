var app = angular.module("getmovieApp");

app.controller("modificarUsrCtrl", function($scope, $rootScope, $route, admCuentaSrv){
	$scope.usuario = {
	    	correousr : "",
	    	claveusr : "",
	    	estadousr : 0,
	    	isadmin : 0,
	    	nombreusr : ""
	    };
	$scope.confirmarClaveUsuario = "";
	$scope.execModificar = false;
	
	$scope.init = function() {
		console.log("Current Params: " + $route.current.params.email);
		if (angular.isUndefined($rootScope.usuario.isadmin)){
			$scope.$location.path('/Home').replace();
		} else {
			admCuentaSrv.findUsrSrv($route.current.params.email, function(usr){
				if (usr == ""){
					$scope.$location.path('/Home').replace();
				}else {
					$scope.usuario.correousr = usr.correousr;
					$scope.usuario.claveusr = usr.claveusr;
					$scope.usuario.nombreusr = usr.nombreusr;
					$scope.confirmarClaveUsuario = $scope.usuario.claveusr;
				}
			}, function(){
				console.log("error " + msgError);
				$scope.addAlert("danger","Error Interno! Consulte con el administrador.");
			})
		}
	}
	
	$scope.modificarUsr = function() {
		$scope.execModificar = true; 
		$scope.alerts = [];
		if ($scope.usuario.correousr == "" || $scope.usuario.claveusr == "" 
			|| $scope.usuario.nombreusr == "" || $scope.confirmarClaveUsuario == ""){
			$scope.addAlert ('danger', 'Error! Complete los campos vacíos.')
		}
		if (angular.isUndefined($scope.usuario.correousr) || angular.isUndefined($scope.usuario.claveusr)
				|| angular.isUndefined($scope.usuario.nombreusr) || angular.isUndefined($scope.confirmarClaveUsuario)
				|| $scope.usuario.claveusr != $scope.confirmarClaveUsuario){
			$scope.addAlert ('danger', 'Error! Ingrese los campos correctamente.')
		}
		if ($scope.alerts.length == 0){
			admCuentaSrv.modificarUsrSrv($scope.usuario, function(response){
				if (!angular.isUndefined(response.success)) {
					console.log("exito " + response.success);
					if ($rootScope.usuario.isAdmin == 0) {
						$scope.addAlert("sucess","Éxito! " + response.success);
						$scope.$location.path('/Cuenta/home').replace();
						$rootScope.usuario.nombreusr = $scope.usuario.nombreusr;
					} else {
						$scope.$location.path('/Administrar').replace();
					}
				} else if (!angular.isUndefined(response.danger)){
					console.log("error " + response.danger);
					$scope.addAlert("danger","Error! " + response.danger);
				}
			}, function(){
				console.log("error interno");
				$scope.addAlert("danger","Error Interno! Consulte con el administrador.");
			})
		}
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
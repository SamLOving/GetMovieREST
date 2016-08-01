var app = angular.module("getmovieApp");

app.controller("registrarUsrCtrl", function($scope, admCuentaSrv) {
	$scope.execRegistrar = false;
	$scope.confirmarClaveUsuario = "";
	$scope.msgBackgroundError = {
			'background-color': '#E57373'
	};
	$scope.usuario = {
	    	correousr : "",
	    	claveusr : "",
	    	estadousr : 0,
	    	isadmin : 0,
	    	nombreusr : ""
	    };
	
	$scope.registrarUsr = function(){
		$scope.execRegistrar = true; 
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
			admCuentaSrv.registrarUsrSrv($scope.usuario, function(response){
				if (!angular.isUndefined(response.success)) {
					console.log("exito " + response.success);
					$scope.addAlert("sucess","Éxito! " + response.success);
					$scope.$location.path('/Home').replace();
				} else if (!angular.isUndefined(response.danger)){
					console.log("error " + response.danger);
					$scope.addAlert("danger","Error! " + response.danger);
				}
			}, function (msgError){
				console.log("error " + msgError);
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

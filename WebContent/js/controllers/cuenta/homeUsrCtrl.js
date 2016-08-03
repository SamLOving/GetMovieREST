var app = angular.module("getmovieApp");

app.controller("homeUsrCtrl", function($rootScope, $scope, $route, admCuentaSrv){
	
	$scope.cerrarSesion = function () {
		$rootScope.usuario.correousr = "";
		$rootScope.usuario.claveusr = "";
		$rootScope.usuario.estadousr = 0;
		$rootScope.usuario.isadmin = 0;
		$rootScope.usuario.nombreusr = "";
		$scope.$location.path('/Home').replace();
	}
});
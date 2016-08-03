var app = angular.module("getmovieApp");

app.controller("eliminarUsrCtrl", function($scope, $rootScope, $route, admCuentaSrv){
	console.log($route.current.params.email);
	$scope.redireccion = ""
	
	admCuentaSrv.eliminarUsrSrv($route.current.params.email, function (respuesta) {
			console.log("usuario eliminado con exito");
			if ($rootScope.usuario.isadmin == 0) {
				$rootScope.usuario.correousr = "";
				$rootScope.usuario.claveusr = "";
				$rootScope.usuario.estadousr = 0;
				$rootScope.usuario.isadmin = 0;
				$rootScope.usuario.nombreusr = "";
				$scope.$location.path('/Home').replace();
			} else {
				$scope.$location.path('/Cuenta/administrar').replace();
			}
		}, function (respuesta){
			console.log("error al eliminar usuario");
		})
});
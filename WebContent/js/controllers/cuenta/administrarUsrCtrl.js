var app = angular.module("getmovieApp");

app.controller("administrarUsrCtrl", function($scope, $rootScope, $route, admCuentaSrv){
	$scope.usuarios = [];
	$scope.correo = "";
	
	$scope.init = function () {
		$scope.listarUsr();
	}
	
	$scope.listarUsr = function () {
		admCuentaSrv.listarUsrSrv($scope.correo, function (respuesta) {
			console.log("consulta exitosa de usuarios");
			$scope.usuarios = respuesta;
		}, function (respuesta){
			console.log("error al listar usuarios");
		})
	}
	
});
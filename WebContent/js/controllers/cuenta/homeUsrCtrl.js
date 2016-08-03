var app = angular.module("getmovieApp");

app.controller("homeUsrCtrl", function($scope, admCuentaSrv){
	$scope.correo = {'email' : $route.current.params.email};
	$scope.eliminarUsr = function (){
		admCuentaSrv.eliminarUsrSrv(correo, function (respuesta) {
			console.log("usuario eliminado con exito");
		}, function (respuesta){
			console.log("error al eliminar usuario");
		})
	}
});
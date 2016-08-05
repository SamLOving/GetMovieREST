var app = angular.module("getmovieApp");

app.controller("admGeneroCtrl", function($scope, $filter, $location, $route, serviceGenero){
    $scope.execRegistrar = false
    $scope.generos = [];
    $scope.msgBackgroundError = {
        'background-color': '#E57373'
    };
    
    $scope.nombregenero = "";
    
    $scope.init = function () {
		$scope.listar();
	}
    
    $scope.listar = function () {
        serviceGenero.listarGenero($scope.nombregenero, function (listaGeneros) {
            $scope.generos = listaGeneros;
        }, function (mensajeError) {
            $scope.error = mensajeError;
        })
    };

    $scope.alerts = [];

    $scope.addAlert = function (tipo, mensaje) {
        $scope.alerts.push({
            type: tipo
            , msg: mensaje
        });
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});
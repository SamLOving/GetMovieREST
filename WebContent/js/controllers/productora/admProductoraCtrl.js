var app = angular.module("getmovieApp");

app.controller("admProductoraCtrl", function($scope, $filter, $location, $route, serviceProductora){
    $scope.execRegistrar = false
    $scope.msgBackgroundError = {
        'background-color': '#E57373'
    };
    $scope.init=function(){
    	$scope.listar();
    };
    
    $scope.nombreproductora = "";
    
    $scope.listar = function () {
        serviceProductora.listarProductora($scope.nombreproductora, function (listaProductoras) {
            $scope.productoras = listaProductoras;
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
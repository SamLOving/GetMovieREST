var app = angular.module("getmovieApp");

app.controller("controllerActor", function ($scope, $filter, $location, $route, serviceActor) {
    $scope.execRegistrar = false
    $scope.msgBackgroundError = {
        'background-color': '#E57373'
    };
    $scope.actor = {
        idactor: 0
        , nombreactor: ""
        , genero: ""
        , nacimiento: ""
        , oscars: 0
        , fotoactor: ""
    }
    $scope.nombre = "";
    var encerar = function(){
    	$scope.actor.idactor = 0;
    	$scope.actor.nombreactor = "";
    	$scope.actor.genero = "";
    	$scope.actor.nacimiento = "";
    	$scope.actor.oscars = "";
    	$scope.actor.fotoactor = "";
    };
    $scope.listar = function () {
        serviceActor.listarActor($scope.nombre, function (listaActores) {
            // console.log("Ctrl exito " + listaActores);
            $scope.actores = listaActores;
        }, function (mensajeError) {
            $scope.error = mensajeError;
        })
    };
    $scope.eliminar = function (id) {
        serviceActor.eliminarActor(id, function (eliminarActor) {
            console.log("Actor eliminado con exito ");
            for (var i = 0; i < $scope.actores.length; i++) {
                if ($scope.actores[i].idactor == id) {
                    $scope.actores.splice(i, 1);
                }
            }
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
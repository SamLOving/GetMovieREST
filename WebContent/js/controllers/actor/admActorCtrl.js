var app = angular.module("getmovieApp");

app.controller("controllerActor", function ($scope, $filter, $location, $route, serviceActor, $timeout) {
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
    $scope.listar = function () {
        serviceActor.listarActor($scope.nombre, function (listaActores) {
            $scope.actores = listaActores;
        }, function (mensajeError) {
            $scope.error = mensajeError;
        })
    };
    $scope.eliminar = function (id) {
        serviceActor.eliminarActor(id, function (eliminarActor) {
            console.log("Actor eliminado con exito ");
				$scope.addAlert("success","Éxito! al eliminar el actor" );
				$timeout(function () {
					for (var i = 0; i < $scope.actores.length; i++) {
		                if ($scope.actores[i].idactor == id) {
		                    $scope.actores.splice(i, 1);
		                }
		            }
                }, 1000);
			
        }, function (mensajeError) {
        	$scope.addAlert("danger","Error! al eliminar actor");
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
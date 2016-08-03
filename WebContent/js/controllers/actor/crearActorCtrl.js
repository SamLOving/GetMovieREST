var app = angular.module("getmovieApp");
app.controller("crearActorCtrl", function ($scope, serviceActor) {
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
    $scope.crear = function () {
        $scope.actor.nacimiento = $filter('date')($scope.actor.nacimiento
            , "yyyy-MM-dd")
        $scope.execRegistrar = true;
        $scope.alerts = [];
        $scope.actor.nacimiento
        if ($scope.actor.nombreactor == "" || $scope.actor.genero == "" || $scope.actor.nacimiento == "" || $scope.actor.oscars == "") {
            $scope.addAlert('danger', 'Error! Complete los campos vacíos.')
        }
        if (angular.isUndefined($scope.actor.nombreactor) || angular.isUndefined($scope.actor.genero) || angular.isUndefined($scope.actor.nacimiento) || angular.isUndefined($scope.actor.oscars)) {
            $scope.addAlert('danger'
                , 'Error! Ingrese los campos correctamente.')
        }
        if ($scope.alerts.length == 0) {
            serviceActor.crearActor($scope.actor, function (nuevoActor) {
                console.log("Nuevo actor creado con exito ");
                $scope.actor = {
                    idactor: 0
                    , nombreactor: ""
                    , genero: ""
                    , nacimiento: ""
                    , oscars: 0
                    , fotoactor: ""
                }
            }, function (mensajeError) {
                $scope.error = mensajeError;
                $scope.alerts = [];
                $scope.addAlert("danger"
                    , "Error Interno! Consulte con el administrador.");
            })
        }
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
    }
});
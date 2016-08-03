var app = angular.module("getmovieApp");
app.controller("modificarActorCtrl", function ($scope, $route, $location, serviceActor) {
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
    $scope.buscar = function () {
        console.log("Current Params: " + $route.current.params.id);
        serviceActor.buscarActor($route.current.params.id, function (actor) {
            if (actor == "") {
                $scope.$location.path('/Actor/Home').replace();
            } else {
                $scope.actor.nombreactor = actor.nombreactor;
                $scope.actor.genero = actor.genero;
                $scope.actor.nacimiento = nacimiento;
                $scope.actor.oscars = actor.oscars;
                $scope.actor.fotoactor = actor.fotoactor;
                $scope.actor.idactor = actor.idactor;
            }
        }, function () {
            console.log("error " + msgError);
            $scope.addAlert("danger", "Error Interno! Consulte con el administrador.");
        })
    }

    $scope.modificar = function () {
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

            serviceActor.modificarActor($scope.actor, function (actorModicar) {
                if (!angular.isUndefined(response.success)) {
                    console.log("exito " + response.success);
                    $scope.addAlert("sucess", "Éxito! " + response.success);
                    $scope.$location.path('/Actor/home').replace();
                } else if (!angular.isUndefined(response.danger)) {
                    console.log("error " + response.danger);
                    $scope.addAlert("danger", "Error! " + response.danger);
                }

            }, function (mensajeError) {
                $scope.error = mensajeError;
                $scope.addAlert("danger", "Error Interno! Consulte con el administrador.");
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
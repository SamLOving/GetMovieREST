var app = angular.module("getmovieApp");
app.controller("verActorCtrl", function ($scope, $route, $filter, serviceActor) {
    $scope.execRegistrar = false
    $scope.msgBackgroundError = {
        'background-color': '#E57373'
    };
    $scope.actor = {
        idactor: 0
        , nombreactor: ""
        , genero: ""
        , nacimiento: ""
        , oscars: ""
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
                $scope.actor.nacimiento = actor.nacimiento;
                
                $scope.actor.oscars = actor.oscars;
                $scope.actor.fotoactor = actor.fotoactor;
                $scope.actor.idactor = actor.idactor;
            }
        }, function () {
            console.log("error " + msgError);
            $scope.addAlert("danger", "Error Interno! Consulte con el administrador.");
        })
    }
});
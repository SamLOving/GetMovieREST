var app = angular.module("getmovieApp");
app.controller("crearDirectorCtrl", function ($scope, serviceActor) {
    $scope.execRegistrar = false
    $scope.msgBackgroundError = {
        'background-color': '#E57373'
    };
    $scope.Director = {
        iddirector: 0
        , nombredirector: ""
        , genero: ""
        , nacimiento: ""
        , fotodirector: ""
    }
    $scope.crear = function () {
        $scope.Director.nacimiento = $filter('date')(
            $scope.Director.nacimiento, "yyyy-MM-dd");
        $scope.execRegistrar = true;
        $scope.alerts = [];
        $scope.actor.nacimiento
        if ($scope.Director.nombredirector == "" || $scope.Director.genero == "" || $scope.actor.nacimiento == "") {
            $scope.addAlert('danger'
                , 'Error! Complete los campos vacíos.')
        }
        if (angular.isUndefined($scope.Director.nombredirector) || angular.isUndefined($scope.Director.genero) || angular.isUndefined($scope.Director.nacimiento)) {
            $scope.addAlert('danger'
                , 'Error! Ingrese los campos correctamente.')
        }
        if ($scope.alerts.length == 0) {
            serviceDirector.crearDirector($scope.Director, function (
                nuevoDirector) {
                console.log("Nuevo Director creado con exito " + nuevoDirector);
                $scope.Director = nuevoDirector;
            }, function (mensajeError) {
                $scope.error = mensajeError;
            })
        }
    }
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
var app = angular.module("getmovieApp");
app.controller("crearDirectorCtrl", function ($scope, $filter, serviceDirector) {
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
    var encerar = function(){
    	$scope.Director.iddirector = 0;
    	$scope.Director.nombredirector = "";
    	$scope.Director.genero = "";
    	$scope.Director.nacimiento = "";
    	$scope.Director.fotodirector = "";
    };
    $scope.crear = function () {
        $scope.Director.nacimiento = $filter('date')($scope.Director.nacimiento, "yyyy-MM-dd");
        $scope.execRegistrar = true;
        $scope.alerts = [];
        if ($scope.Director.nombredirector == "" || $scope.Director.genero == "" || $scope.Director.nacimiento == "") {
            $scope.addAlert('danger'
                , 'Error! Complete los campos vacíos.')
        }
        if (angular.isUndefined($scope.Director.nombredirector) || angular.isUndefined($scope.Director.genero) || angular.isUndefined($scope.Director.nacimiento)) {
            $scope.addAlert('danger'
                , 'Error! Ingrese los campos correctamente.')
        }
        if ($scope.alerts.length == 0) {
            serviceDirector.crearDirector($scope.Director, 
            	function (response) {
                console.log("Nuevo Director creado con exito ");
                if (!angular.isUndefined(response.success)) {
                    console.log("exito " + response.success);
                    $scope.addAlert("success", "Éxito al crear director! " + response.success);
                    $scope.$location.path('/Director/home').replace();
                    
                } else if (!angular.isUndefined(response.danger)) {
                    console.log("error " + response.danger);
                    $scope.addAlert("danger", "Error al crear el director! " + response.danger);
                }
                encerar();
            }, function (mensajeError) {
                $scope.error = mensajeError;
                console.log("Error ctrl Director");
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
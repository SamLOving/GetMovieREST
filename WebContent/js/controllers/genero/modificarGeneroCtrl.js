var app = angular.module("getmovieApp");

app.controller("modificarGeneroCtrl", function($scope, $route, $filter, serviceGenero){
    $scope.execRegistrar = false
    $scope.msgBackgroundError = {
        'background-color': '#E57373'
    };
    $scope.genero = {
        idgenero: 0
        , nombregenero: ""
        , descripciongenero: ""
    }
    
    $scope.init=function (){
    	$scope.buscar();
    };
    $scope.buscar = function () {
        console.log("Current Params: " + $route.current.params.idgenero);
     serviceGenero.buscarGenero($route.current.params.idgenero, function (genero) {
            if (genero == "") {
                $scope.$location.path('/Genero/home').replace();
            } else {
            	$scope.genero.idgenero = genero.idgenero;
                $scope.genero.nombregenero = genero.nombregenero;
                $scope.genero.descripciongenero = genero.descripciongenero;
                
            }
        }, function () {
            console.log("error " + msgError);
            $scope.addAlert("danger", "Error Interno! Consulte con el administrador.");
        })
    }

    $scope.modificar = function () {
        $scope.execRegistrar = true;
        $scope.alerts = [];
        if ($scope.genero.nombregenero == "" || $scope.genero.descripciongenero == "" ) {
            $scope.addAlert('danger', 'Error! Complete los campos vacíos.')
        }
        if (angular.isUndefined($scope.genero.nombregenero) || angular.isUndefined($scope.genero.descripciongenero)) {
            $scope.addAlert('danger'
                , 'Error! Ingrese los campos correctamente.')
        }
        if ($scope.alerts.length == 0) {
            serviceGenero.modificarGenero($scope.genero, function (response) {
                console.log("Genero modificado ctrl")
            	if (!angular.isUndefined(response.success)) {
                    console.log("exito " + response.success);
                    $scope.addAlert("success", "Éxito al modificar Genero! " + response.success);
                    $scope.$location.path('/Genero/home').replace();
                } else if (!angular.isUndefined(response.danger)) {
                    console.log("error " + response.danger);
                    $scope.addAlert("danger", "Error al modificar Genero! " + response.danger);
                }

            }, function (mensajeError) {
            	console.log(" error Genero modificando ctrl")
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
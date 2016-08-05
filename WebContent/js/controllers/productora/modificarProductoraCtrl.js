var app = angular.module("getmovieApp");

app.controller("modificarProductoraCtrl", function($scope, $route, $filter, serviceProductora){
    $scope.execRegistrar = false
    $scope.msgBackgroundError = {
        'background-color': '#E57373'
    };
    $scope.productora = {
        idproductora: 0
        , nombreproductora: ""
        , paisproductora: ""
    }
    $scope.init=function(){
    	$scope.buscar();
    };
    
    $scope.buscar = function () {
        console.log("Current Params: " + $route.current.params.idproductora);
     serviceProductora.buscarProductora($route.current.params.idproductora, function (productora) {
            if (productora == "") {
                $scope.$location.path('/Productora/home').replace();
            } else {
            	$scope.productora.idproductora = productora.idproductora;
                $scope.productora.nombreproductora = productora.nombreproductora;
                $scope.productora.paisproductora = productora.paisproductora;
                
            }
        }, function () {
            console.log("error " + msgError);
            $scope.addAlert("danger", "Error Interno! Consulte con el administrador.");
        })
    }

    $scope.modificar = function () {
        $scope.execRegistrar = true;
        $scope.alerts = [];
        if ($scope.productora.nombreproductora == "" || $scope.productora.paisproductora == "" ) {
            $scope.addAlert('danger', 'Error! Complete los campos vacíos.')
        }
        if (angular.isUndefined($scope.productora.nombreproductora) || angular.isUndefined($scope.productora.paisproductora)) {
            $scope.addAlert('danger'
                , 'Error! Ingrese los campos correctamente.')
        }
        if ($scope.alerts.length == 0) {
            serviceProductora.modificarProductora($scope.productora, function (response) {
                console.log("Productora modificada ctrl")
            	if (!angular.isUndefined(response.success)) {
                    console.log("exito " + response.success);
                    $scope.addAlert("success", "Éxito al modificar Productora! " + response.success);
                    $scope.$location.path('/Productora/home').replace();
                } else if (!angular.isUndefined(response.danger)) {
                    console.log("error " + response.danger);
                    $scope.addAlert("danger", "Error al modificar Productora! " + response.danger);
                }

            }, function (mensajeError) {
            	console.log(" error Productora modificando ctrl")
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
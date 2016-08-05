var app = angular.module("getmovieApp");

app.controller("infoProductoraCtrl", function($scope, $route, $filter, serviceProductora){
  $scope.execRegistrar = false
    $scope.msgBackgroundError = {
        'background-color': '#E57373'
    };
    $scope.productora = {
        idproductora: 0
        , nombreproductora: ""
        , paisproductora: ""
    }
    
    $scope.init=function (){
    	$scope.buscar();
    };
    
    $scope.buscar = function () {
        console.log("Current Params: " + $route.current.params.idproductora);
        serviceProductora.buscarProductora($route.current.params.idproductora, function (productora) {
            if (productora == "") {
                $scope.$location.path('/Productora/home').replace();
            } else {
                $scope.productora.nombreproductora = productora.nombreproductora;
                $scope.productora.paisproductora = productora.paisproductora;
            }
        }, function () {
            console.log("error " + msgError);
            $scope.addAlert("danger", "Error Interno! Consulte con el administrador.");
        })
    }
});
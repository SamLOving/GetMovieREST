var app = angular.module("getmovieApp");

app.controller("infoGeneroCtrl", function($scope, $route, $filter, serviceGenero){
  $scope.execRegistrar = false
    $scope.msgBackgroundError = {
        'background-color': '#E57373'
    };
    $scope.genero = {
        idgenero: 0
        , nombregenero: ""
        , descripciongenero: ""
    }
    
    $scope.init = function(){
    	$scope.buscar();
    };
    
    $scope.buscar = function () {
        console.log("Current Params: " + $route.current.params.idgenero);
        serviceGenero.buscarGenero($route.current.params.idgenero, function (genero) {
            if (genero == "") {
                $scope.$location.path('/Genero/home').replace();
            } else {
                $scope.genero.nombregenero = genero.nombregenero;
                $scope.genero.descripciongenero = genero.descripciongenero;
            }
        }, function () {
            console.log("error " + msgError);
            $scope.addAlert("danger", "Error Interno! Consulte con el administrador.");
        })
    }
});
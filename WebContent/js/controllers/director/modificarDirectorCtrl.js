var app = angular.module("getmovieApp");
app.controller("modificarDirectorCtrl", function ($scope, $route, $filter, serviceDirector) {
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
    $scope.buscar = function() {
		console.log("Current Params: " + $route.current.params.id);
		serviceDirector.buscarDirector($route.current.params.id, function(director){
			if (director == ""){
				$scope.$location.path('/Director/home').replace();
			}else {
				$scope.Director.nombredirector = director.nombredirector;
				$scope.Director.genero = director.genero;
				$scope.Director.nacimiento = director.nacimiento;
				$scope.Director.fotodirector = director.fotodirector;
				$scope.Director.iddirector = director.iddirector;
			}
		}, function(msgError){
			console.log("error " + msgError);
			$scope.addAlert("danger","Error Interno! Consulte con el administrador.");
		})}
    $scope.modificar = function () {
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
            serviceDirector.modificarDirector($scope.Director
                , function (response) {
            	if (!angular.isUndefined(response.success)) {
                    console.log("exito " + response.success);
                    $scope.addAlert("success", "Éxito al modificar director! ");
                    $scope.$location.path('/Director/home').replace();
                } else if (!angular.isUndefined(response.danger)) {
                    console.log("error " + response.danger);
                    $scope.addAlert("danger", "Error al modificar actor! ");
                }
            }, function (mensajeError) {
            	console.log(" error Actor modificando ctrl")
                $scope.error = mensajeError;
                $scope.addAlert("danger", "Error Interno! Consulte con el administrador.");
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
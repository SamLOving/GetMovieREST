var app = angular.module("getmovieApp");

app.controller("registrarGeneroCtrl", function($scope, $filter, serviceGenero){
    $scope.execRegistrar = false
    $scope.msgBackgroundError = {
        'background-color': '#E57373'
    };
    $scope.genero = {
        idgenero: 0
        , nombregenero: ""
        , descripciongenero: ""
    }
    
    $scope.crear = function () {
        $scope.execRegistrar = true;
        $scope.alerts = [];
        if ($scope.genero.nombregenero == "" || $scope.genero.descripciongenero == "") {
            $scope.addAlert('danger', 'Error! Complete los campos vacíos.')
        }
        if (angular.isUndefined($scope.genero.nombregenero) || angular.isUndefined($scope.genero.descripciongenero)) {
            $scope.addAlert('danger'
                , 'Error! Ingrese los campos correctamente.')
        }
        if ($scope.alerts.length == 0) {
            serviceGenero.crearGenero($scope.genero, function (response) {
                console.log("Nuevo genero creado con exito ");
                if (!angular.isUndefined(response.success)) {
					console.log("exito " + response.success);
					$scope.addAlert("success","Éxito! " + response.success);
					
				} else if (!angular.isUndefined(response.danger)){
					console.log("error " + response.danger);
					$scope.addAlert("danger","Error! " + response.danger);
				}
			}, function (msgError){
				console.log("error " + msgError);
				$scope.addAlert("danger","Error Interno! Consulte con el administrador.");
			})
        }
    };
    $scope.alerts = [];

	$scope.addAlert = function(tipo, mensaje) {
		$scope.alerts.push({
			type: tipo,
			msg : mensaje
		});
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
});
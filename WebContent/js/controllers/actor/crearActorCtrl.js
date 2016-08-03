var app = angular.module("getmovieApp");
app.controller("crearActorCtrl", function ($scope, $filter, serviceActor) {
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
    var encerar = function(){
    	$scope.actor.idactor = 0;
    	$scope.actor.nombreactor = "";
    	$scope.actor.genero = "";
    	$scope.actor.nacimiento = "";
    	$scope.actor.oscars = "";
    	$scope.actor.fotoactor = "";
    };
    $scope.crear = function () {
        $scope.actor.nacimiento = $filter('date')($scope.actor.nacimiento, "yyyy-MM-dd")
        $scope.execRegistrar = true;
        $scope.alerts = [];
        if ($scope.actor.nombreactor == "" || $scope.actor.genero == "" || $scope.actor.nacimiento == "" || $scope.actor.oscars == "") {
            $scope.addAlert('danger', 'Error! Complete los campos vacíos.')
        }
        if (angular.isUndefined($scope.actor.nombreactor) || angular.isUndefined($scope.actor.genero) || angular.isUndefined($scope.actor.nacimiento) || angular.isUndefined($scope.actor.oscars)) {
            $scope.addAlert('danger'
                , 'Error! Ingrese los campos correctamente.')
        }
        if ($scope.alerts.length == 0) {
            serviceActor.crearActor($scope.actor, function (response) {
                console.log("Nuevo actor creado con exito ");
                if (!angular.isUndefined(response.success)) {
					console.log("exito " + response.success);
					$scope.addAlert("success","Éxito! " + response.success);
					
				} else if (!angular.isUndefined(response.danger)){
					console.log("error " + response.danger);
					$scope.addAlert("danger","Error! " + response.danger);
				}
                encerar();
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
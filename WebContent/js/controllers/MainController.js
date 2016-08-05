var app = angular.module("getmovieApp");

app.controller('MainController', function($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
});

app.config(function ($routeProvider) {
	$routeProvider
		.when('/Cuenta/home',  {
				   templateUrl: 'admLocal/admCuenta/home.html',
				   controller: 'homeUsrCtrl'})
		.when('/Cuenta/info',  {
			        templateUrl: 'admLocal/admCuenta/infoCuenta.html',
			        controller: 'infoUsrCtrl'})
	   .when('/Cuenta/modificar/:email',  {
			        templateUrl: 'admLocal/admCuenta/modificar.html',
			        controller: 'modificarUsrCtrl'})
		.when('/Cuenta/eliminar/:email',  {
			        templateUrl: 'admLocal/admCuenta/eliminarUsr.html',
			        controller: 'eliminarUsrCtrl'})
	   .when('/Cuenta/registrar',  {
			        templateUrl: 'admLocal/admCuenta/registrarAdmin.html',
			        controller: 'registrarUsrCtrl'})
	   .when('/Cuenta/administrar',  {
			        templateUrl: 'admLocal/admCuenta/administrar.html',
			        controller: 'administrarUsrCtrl'})
	   .when('/Pelicula/home',  {
                   templateUrl: 'admLocal/admPelicula/home.html',
                   controller: 'Controlador1'})
	   .when('/Genero/home',  {
                   templateUrl: 'admLocal/admGenero/home.html',
                   controller: 'homeGeneroCtrl'})
        .when('/Genero/info/:idgenero',  {
                   templateUrl: 'admLocal/admGenero/info.html',
                   controller: 'infoGeneroCtrl'})
        .when('/Genero/administrar',  {
                   templateUrl: 'admLocal/admGenero/administrar.html',
                   controller: 'admGeneroCtrl'})
        .when('/Genero/modificar/:idgenero',  {
                   templateUrl: 'admLocal/admGenero/modificar.html',
                   controller: 'modificarGeneroCtrl'})
        .when('/Genero/registrar',  {
                   templateUrl: 'admLocal/admGenero/registrar.html',
                   controller: 'registrarGeneroCtrl'})
        .when('/Genero/eliminar/:idgenero',  {
                   templateUrl: 'admLocal/admGenero/eliminar.html',
                   controller: 'eliminarGeneroCtrl'})
        .when('/Actor/home',  {
                   templateUrl: 'admLocal/admActor/home.html',
                   controller: 'homeActorCtrl'})
        .when('/Actor/registrar',  {
                   templateUrl: 'admLocal/admActor/registrar.html',
                   controller: 'crearActorCtrl'})
        .when('/Actor/modificar/:id',  {
                   templateUrl: 'admLocal/admActor/modificar.html',
                   controller: 'modificarActorCtrl'})
        .when('/Actor/ver/:id',  {
                   templateUrl: 'admLocal/admActor/infoActor.html',
                   controller: 'verActorCtrl'})
        .when('/Actor/administrar',  {
                   templateUrl: 'admLocal/admActor/administrar.html',
                   controller: 'controllerActor'})
       .when('/Director/home',  {
                   templateUrl: 'admLocal/admDirector/home.html',
                   controller: 'homeDirectorCtrl'})
        .when('/Director/registrar',  {
                   templateUrl: 'admLocal/admDirector/registrar.html',
                   controller: 'crearDirectorCtrl'})
        .when('/Director/modificar/:id',  {
                   templateUrl: 'admLocal/admDirector/modificar.html',
                   controller: 'modificarDirectorCtrl'})
        .when('/Director/ver/:id',  {
                   templateUrl: 'admLocal/admDirector/infoDirector.html',
                   controller: 'verDirectorCtrl'})
        .when('/Director/administrar',  {
                   templateUrl: 'admLocal/admDirector/administrar.html',
                   controller: 'controllerDirector'})
       .when('/Productora/administrar',  {
                   templateUrl: 'admLocal/admProductora/administrar.html',
                   controller: 'admProductoraCtrl'})
    .when('/Productora/home',  {
                   templateUrl: 'admLocal/admProductora/home.html',
                   controller: 'homeProductoraCtrl'})
    .when('/Productora/info/:idproductora',  {
                   templateUrl: 'admLocal/admProductora/info.html',
                   controller: 'infoProductoraCtrl'})
    .when('/Productora/modificar/:idproductora',  {
                   templateUrl: 'admLocal/admProductora/modificar.html',
                   controller: 'modificarProductoraCtrl'})
    .when('/Productora/registrar',  {
                   templateUrl: 'admLocal/admProductora/registrar.html',
                   controller: 'registrarProductoraCtrl'})
     .when('/Productora/eliminar/:idproductora',  {
                   templateUrl: 'admLocal/admProductora/eliminar.html',
                   controller: 'eliminarProductoraCtrl'})
       .when('/login',  {
                   templateUrl: 'admLocal/admCuenta/login.html',
                   controller: 'loginCtrl'})
       .when('/sing_up',  {
                   templateUrl: 'admLocal/admCuenta/registrar.html',
                   controller: 'registrarUsrCtrl'})
	   .otherwise({
        templateUrl : 'admLocal/home.html'
        });
});

app.controller('Controlador1',function($scope){
	$scope.name='Controlador1';
});

app.controller('Controlador2',function($scope){
	$scope.name='Controlador2';
});

app.controller('Controlador3',function($scope){
	$scope.name='Controlador3';
});

app.controller('Controlador4',function($scope){
	$scope.name='Controlador4';
});

app.controller('Controlador5',function($scope){
	$scope.name='Controlador5';
});

app.controller('Controlador6',function($scope){
	$scope.name='Controlador6';
});

app.controller('Controlador7',function($scope){
	$scope.name='Controlador7';
});
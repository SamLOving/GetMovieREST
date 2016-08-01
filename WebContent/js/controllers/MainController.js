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
	   .when('/Pelicula/home',  {
                   templateUrl: 'admLocal/admPelicula/home.html',
                   controller: 'Controlador1'})
	   .when('/Genero/:paramB',  {
                   templateUrl: 'admLocal/admGenero/home.html',
                   controller: 'Controlador2'})
       .when('/Actor/:paramC',  {
                   templateUrl: 'admLocal/admActor/home.html',
                   controller: 'Controlador3'})
       .when('/Director/:paramD',  {
                   templateUrl: 'admLocal/admDirector/home.html',
                   controller: 'Controlador4'})
       .when('/Productora/:paramE',  {
                   templateUrl: 'admLocal/admProductora/home.html',
                   controller: 'Controlador5'})
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
var app = angular.module("getmovieApp");

app.service('admCuentaSrv', function($http) {
	this.logginSrv = function(usuario, successCallback, errorCallback) {
		$http.post('http://localhost:8080/GetMovieREST/servicios/cuenta/login',
				usuario).then(function(response) {
			successCallback(response.data);
		}, function(response) {
			errorCallback("Credenciales incorrectas");
		});
	}

	this.findUsrSrv = function(correo, successCallback, errorCallback) {
		$http.get(
				'http://localhost:8080/GetMovieREST/servicios/cuenta/buscarByEmail?email='
						+ correo).then(function(response) {
			successCallback(response.data);
		}, function(response) {
			errorCallback("Credenciales incorrectas");
		});
	}

	this.registrarUsrSrv = function(usuario, successCallback, errorCallback) {
		$http.post('http://localhost:8080/GetMovieREST/servicios/cuenta/crear',
				usuario).then(function(response) {
			successCallback(response.data);
		}, function(response) {
			errorCallback("Problemas al crear el usuario");
		});
	}
	
	this.modificarUsrSrv = function(usuario, successCallback, errorCallback) {
		$http.put('http://localhost:8080/GetMovieREST/servicios/cuenta/modificar',
				usuario).then(function(response) {
			successCallback(response.data);
		}, function(response) {
			errorCallback("Problemas al modificar el usuario");
		});
	}
	
	this.eliminarUsrSrv = function(usuario, successCallback, errorCallback) {
		$http.get('http://localhost:8080/GetMovieREST/servicios/cuenta/eliminar?email=' +
				usuario).then(function(response) {
			successCallback(response.data);
		}, function(response) {
			errorCallback("Problemas al eliminar el usuario");
		});
	}
	
	this.listarUsrSrv = function(usuario, successCallback, errorCallback) {
		$http.get('http://localhost:8080/GetMovieREST/servicios/cuenta/listarByEmail?email=' +
				usuario).then(function(response) {
			successCallback(response.data);
		}, function(response) {
			errorCallback("Problemas al consultar usuarios el usuario");
		});
	}
});

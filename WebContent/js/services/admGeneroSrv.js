var app = angular.module("getmovieApp");

app.service("serviceGenero", function ($http) {
    this.crearGenero = function (genero, successCallback, errorCallback) {
    	$http.post("http://localhost:8080/GetMovieREST/servicios/genero/crear", genero).then(
            function (response) {
                console.log("Exito en el servicio crear Genero" );
                successCallback(response.data);
            }
            , function (response) {
                console.log("Error en el servicio crear Genero" );
                errorCallback(response.data);
            }
        )
    };
    this.modificarGenero = function (genero, successCallback, errorCallback) {
        $http.put("http://localhost:8080/GetMovieREST/servicios/genero/modificar", genero).then(
            function (response) {
                console.log("Exito en el servicio Modificar Genero" ) 
                successCallback(response.data)
            }
            , function (response) {
                console.log("Error en el servicio al Modificar Genero")
                errorCallback(response.data)
            }
        )
    };
    this.buscarGenero = function (idGenero, successCallback, errorCallback) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/genero/buscar?idGenero=" + idGenero).then(
            function (response) {
                console.log("Exito en el servicio al buscar Genero" )
                successCallback(response.data)
            }
            , function (response) {
                console.log("Error en el servicio al buscar Genero" + response)
                errorCallback(response.data)
            }
        )
    };
    this.listarGenero = function (nombreGenero, successCallback, errorCallback) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/genero/listar?nombreGenero=" + nombreGenero).then(
            function (response) {
                console.log("Exito en el sevicio al listar Genero")
                successCallback(response.data)
            }
            , function (response) {
                console.log("Error en el servicio al listar Genero");
                errorCallback("No se ha encontrado una lista de Generos");
            }
        )
    };
    this.eliminarGenero = function (idGenero, successCallback, errorCallback) {
        $http.delete("http://localhost:8080/GetMovieREST/servicios/genero/eliminar?idGenero=" + idGenero).then(
            function (response) {
                console.log("Exito en el servicio al eliminar Genero")
                successCallback(response.data)
            }
            , function (response) {
                console.log("Error " + response)
                errorCallback(response.data)
            }
        )
    };
});
var app = angular.module("getmovieApp");

app.service("serviceProductora", function ($http) {
    this.crearProductora = function (productora, successCallback, errorCallback) {
    	$http.post("http://localhost:8080/GetMovieREST/servicios/productora/crear", productora).then(
            function (response) {
                console.log("Exito en el servicio crear Productora" );
                successCallback(response.data);
            }
            , function (response) {
                console.log("Error en el servicio crear Productora" );
                errorCallback(response.data);
            }
        )
    };
    this.modificarProductora = function (productora, successCallback, errorCallback) {
        $http.put("http://localhost:8080/GetMovieREST/servicios/productora/modificar", productora).then(
            function (response) {
                console.log("Exito en el servicio Modificar Productora" ) 
                successCallback(response.data)
            }
            , function (response) {
                console.log("Error en el servicio al Modificar Productora")
                errorCallback(response.data)
            }
        )
    };
    this.buscarProductora = function (idProductora, successCallback, errorCallback) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/productora/buscar?idProductora=" + idProductora).then(
            function (response) {
                console.log("Exito en el servicio al buscar Productora")
                successCallback(response.data)
            }
            , function (response) {
                console.log("Error en el servicio al buscar Productora" + response)
                errorCallback(response.data)
            }
        )
    };
    this.listarProductora = function (nombreProductora, successCallback, errorCallback) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/productora/listar?nombreProductora=" + nombreProductora).then(
            function (response) {
                console.log("Exito en el sevicio al listar Productora")
                successCallback(response.data)
            }
            , function (response) {
                console.log("Error en el servicio al listar Productora");
                errorCallback(response.data);
            }
        )
    };
    this.eliminarProductora = function (idProductora, successCallback, errorCallback) {
        $http.delete("http://localhost:8080/GetMovieREST/servicios/productora/eliminar?idProductora=" + idProductora).then(
            function (response) {
                console.log("Exito en el servicio al eliminar Productora")
                successCallback(response.data)
            }
            , function (response) {
                console.log("Error " + response)
                errorCallback(response.data)
            }
        )
    };
});
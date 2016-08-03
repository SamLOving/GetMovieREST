var app = angular.module("getmovieApp");

app.service("serviceActor", function ($http) {
    this.crearActor = function (actor, successCallback, errorCallback) {
    	$http.post("http://localhost:8080/GetMovieREST/servicios/actor/crear", actor).then(
            function (response) {
                console.log("Exito en el servicio crear" );
                successCallback("Actor creado");
            }
            , function (response) {
                console.log("Error en el servicio crear" );
                errorCallback("No se creo el actor");
            }
        )
    };
    this.modificarActor = function (actor, successCallback, errorCallback) {
        $http.put("http://localhost:8080/GetMovieREST/servicios/actor/modificar?nombre=", actor).then(
            function (response) {
                console.log("Exito al modificar actor servicio" ) 
                successCallback("Se modificó el actor")
            }
            , function (response) {
                console.log("Error al modificar actor servicio")
                errorCallback("Hubo un error al modificar el actor")
            }
        )
    };
    this.buscarActor = function (id, successCallback, errorCallback) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/actor/buscar?id=" + id).then(
            function (response) {
                console.log("Exito al buscar actor servicio" )
                successCallback("Se ha encontrado el actor")
                successCallback(response.data)
            }
            , function (response) {
                console.log("Error al buscar actor servicio" + response)
                errorCallback("No se encontro el actor")
            }
        )
    };
    this.listarActor = function (nombre, successCallback, errorCallback) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/actor/listar?nombre=" + nombre).then(
            function (response) {
                console.log("Exito al listar actor servicio")
                successCallback("Lista de actores desplegada");
                successCallback(response.data)
            }
            , function (response) {
                console.log("Error al listar actor servicio");
                errorCallback("No se ha encontrado una lista de actores");
            }
        )
    };
    this.eliminarActor = function (id, successCallback, errorCallback) {
        $http.delete("http://localhost:8080/GetMovieREST/servicios/actor/eliminar?id=" + id).then(
            function (response) {
                console.log("Exito al eliminar actor servicio")
                successCallback("Se ha eliminado el actor")
            }
            , function (response) {
                console.log("Error " + response)
                errorCallback("No se pudo eliminar el actor")
            }
        )
    };
});
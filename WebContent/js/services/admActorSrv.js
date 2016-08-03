var app = angular.module("getmovieApp");

app.service("serviceActor", function ($http) {
    this.crearActor = function (actor, exito, error) {
    	$http.post("http://localhost:8080/GetMovieREST/servicios/actor/crear", actor).then(
            function (response) {
                console.log("Exito en el servicio" );
                exito(response.data);
            }
            , function (response) {
                console.log("Error en el servicio" );
                error(response.statusText);
            }
        )
    };
    this.modificarActor = function (actor, exito, error) {
        $http.put("http://localhost:8080/GetMovieREST/servicios/actor/modificar?nombre=", actor).then(
            function (response) {
                console.log("Exito " + response) 
                exito(response.data)
            }
            , function (response) {
                console.log("Error " + response)
                error(response.statusText)
            }
        )
    };
    this.buscarActor = function (id, exito, error) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/actor/buscar?id=" + id).then(
            function (response) {
                console.log("Exito " + response)
                exito(response.data)
            }
            , function (response) {
                console.log("Error " + response)
                error(response.statusText)
            }
        )
    };
    this.listarActor = function (nombre, exito, error) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/actor/listar?nombre=" + nombre).then(
            function (response) {
                console.log("Exito ")
                exito(response.data);
            }
            , function (response) {
                console.log("Error ");
                error(response.statusText);
            }
        )
    };
    this.eliminarActor = function (id, exito, error) {
        $http.delete("http://localhost:8080/GetMovieREST/servicios/actor/eliminar?id=" + id).then(
            function (response) {
                console.log("Exito " + response)
                exito(response.data)
            }
            , function (response) {
                console.log("Error " + response)
                error(response.statusText)
            }
        )
    };
});
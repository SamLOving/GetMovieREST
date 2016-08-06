var app = angular.module("getmovieApp");

app.service("serviceActor", function ($http) {
    this.crearActor = function (actor, exito, error) {
    	$http.post("http://localhost:8080/GetMovieREST/servicios/actor/crear", actor).then(
            function (response) {
                console.log("Exito en el servicio crear" );
                exito(response.data);
            }
            , function (response) {
                console.log("Error en el servicio crear" );
                error(response.data);
            }
        )
    };
    this.modificarActor = function (actor, exito, error) {
        $http.put("http://localhost:8080/GetMovieREST/servicios/actor/modificar", actor).then(
            function (response) {
                console.log("Exito al modificar actor servicio" ) 
                exito(response.data)
            }
            , function (response) {
                console.log("Error al modificar actor servicio")
                error(response.data)
            }
        )
    };
    this.buscarActor = function (id, exito, error) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/actor/buscar?id=" + id).then(
            function (response) {
                console.log("Exito al buscar actor servicio" )
                exito(response.data)
            }
            , function (response) {
                console.log("Error al buscar actor servicio" + response)
                error(response.data)
            }
        )
    };
    this.listarActor = function (nombre, exito, error) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/actor/listar?nombre=" + nombre).then(
            function (response) {
                console.log("Exito al listar actor servicio")
                exito(response.data)
            }
            , function (response) {
                console.log("Error al listar actor servicio");
                error("error en js Srv");
            }
        )
    };
    this.eliminarActor = function (id, exito, error) {
        $http.delete("http://localhost:8080/GetMovieREST/servicios/actor/eliminar?id=" + id).then(
            function (response) {
                console.log("Exito al eliminar actor servicio")
                exito(response.data)
            }
            , function (response) {
                console.log("Error " + response)
                error(response.data)
            }
        )
    };
});
var app = angular.module("getmovieApp");

app.service("serviceDirector", function ($http) {
    this.crearDirector = function (director, exito, error) {
        $http.post("http://localhost:8080/GetMovieREST/servicios/director/crear", director).then(
            function (response) {
                console.log("Exito al crear director servicio")
                exito(response.data)
            }
            , function (response) {
                console.log("Error al crear director servicio" + response.statusText)
                error(response.data)
            }
        )
    };
    this.modificarDirector = function (director, exito, error) {
        $http.put("http://localhost:8080/GetMovieREST/servicios/director/modificar", director).then(
            function (response) {
                console.log("Exito al modificar director servicio")
                exito(response.data)
            }
            , function (response) {
                console.log("Error al modificar director servicio")
                error(response.data)
            }
        )
    };
    this.buscarDirector = function (id, exito, error) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/director/buscar?id="+id).then(
            function (response) {
                console.log("Exito al buscar director servicio")
                exito(response.data)
            }
            , function (response) {
                console.log("Error al buscar director servicio")
                error(response.data)
            }
        )
    };
    this.eliminarDirector = function (id, exito, error) {
        $http.delete("http://localhost:8080/GetMovieREST/servicios/director/eliminar?id="+id).then(
            function (response) {
                console.log("Exito al eliminar director servicio")
                exito(response.data)
            }
            , function (response) {
                console.log("Error " + response)
                error(response.data)
            }
        )
    };
    this.listarDirector = function (nombre, exito, error) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/director/listar?nombre="+nombre).then(
            function (response) {
                console.log("Exito al eliminar director servicio")
                exito(response.data)
            }
            , function (response) {
                console.log("Error al eliminar director servicio" )
                error(response.data)
            }
        )
    };
});s
var app = angular.module("getmovieApp");

app.service("serviceDirector", function ($http) {
    this.crearDirector = function (director, exito, error) {
        $http.post("http://localhost:8080/GetMovieREST/rest/Director/crear?nombre=" + director.nombre + "&genero=" + director.genero + "&nacimiento=" + director.nacimiento).then(
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
    this.modificarDirector = function (director, exito, error) {
        $http.put("http://localhost:8080/GetMovieREST/rest/Director/modificar?nombre=" + director.nombre + "&genero=" + director.genero + "&nacimiento=" + director.nacimiento+"&id="+director.id).then(
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
    this.buscarDirector = function (director, exito, error) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/director/buscar?id="+director.id).then(
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
    this.eliminarDirector = function (id, exito, error) {
        $http.delete("http://localhost:8080/GetMovieREST/servicios/director/eliminar?id="+id).then(
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
    this.listarDirector = function (nombre, exito, error) {
        $http.get("http://localhost:8080/GetMovieREST/servicios/director/listar?nombre="+nombre).then(
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
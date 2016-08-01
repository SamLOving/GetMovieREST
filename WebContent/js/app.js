var app = angular.module("getmovieApp",['ngRoute','ui.bootstrap','ngStorage']);

app.run(function($rootScope) {
	$rootScope.usuario = {
	    	correousr : "",
	    	claveusr : "",
	    	estadousr : 0,
	    	isadmin : 0,
	    	nombreusr : ""
	    };
});
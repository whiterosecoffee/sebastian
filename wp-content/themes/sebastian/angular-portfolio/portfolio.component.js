var $appRoot = angularLocal.portfolioApp;
var $jsonRoot = 'http://localhost/sebastian/wp-json/wp/v2/';
angular.module('portfolio', ['ngRoute', 'ngSanitize'])

    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
        .when('/portfolio', {
            templateUrl: $appRoot + 'portfolio.template.html',
            controller: 'Portfolio'
        })

        .when('portfolio/:ID', {
            templateUrl: $appRoot + 'single-project.html',
            controller: 'Project'
        });
    })

    .controller('Portfolio', function($scope, $http, $routeParams) {
        console.log('angular-portfolio ready');

        $http.get( $jsonRoot + 'Projects/').success(function(res){
    		$scope.projects = res;
    	});
    })

    .controller('Project', function($scope, $http, $routeParams) {
    	$http.get( $jsonRoot + 'Projects/' + $routeParams.ID).success(function(res){
    		$scope.post = res;
    	});
    });

angular.module('app', ['ngRoute', 'app.services', 'app.filters', 'app.controller'])
    .constant('API_BASE_URL', '/api')
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.when('/brewery/:name', {
                templateUrl: 'templates/brewery.html',
                controller: 'BreweryCtrl'
            }).when('/brewery/:name/beer/:beerId', {
                templateUrl: 'templates/beer.html',
                controller: 'BeerCtrl'
            }).otherwise({
                redirectTo: '/brewery/greenflash'
            });

            $locationProvider.hashPrefix('');
        }
    ])
;
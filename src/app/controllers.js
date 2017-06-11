angular.module('app.controller', ['app.services'])
    .controller('BreweryCtrl', function ($scope, $routeParams, breweryService) {
        $scope.breweryName = $routeParams.name;

        breweryService.getBrewery($scope.breweryName).then(function (brewery) {
            $scope.brewery = brewery;
        });
        breweryService.getBeers($scope.breweryName).then(function (beers) {
            $scope.beers = beers;
        });
    })
    .controller('BeerCtrl', function ($scope, $http, $routeParams, breweryService) {
        $scope.breweryName = $routeParams.name;

        breweryService.getBeer($scope.breweryName, $routeParams.beerId).then(function (beer) {
            $scope.beer = beer;
        });

        breweryService.getBrewery($scope.breweryName).then(function (brewery) {
            $scope.brewery = brewery;
        });

    })
;
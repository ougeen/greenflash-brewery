angular.module('app.services', [])
    .service('breweryService', function (API_BASE_URL, $http, $q) {
        return {
            getBrewery: function (breweryName) {
                return $q(function (success, reject) {
                    $http({
                        method: 'GET',
                        url: API_BASE_URL + '/breweries/' + breweryName + '/brewery.json'
                    }).then(function (response) {
                        success(response.data.data);
                    }, function (error) {
                        reject(error);
                    });
                });
            },
            getBeers: function (breweryName) {
                return $q(function (success, reject) {
                    $http({
                        method: 'GET',
                        url:  API_BASE_URL + '/breweries/' + breweryName + '/beers.json',
                    }).then(function (response) {
                        success(response.data.data);
                    }, function (error) {
                        reject(error);
                    });
                });
            },
            getBeer: function (breweryName, beerId) {
                var service = this;

                return $q(function (success, reject) {

                    service.getBeers(breweryName).then(function (beers) {
                        for(var i = 0; i < beers.length; i++) {
                            if(beers[i].id === beerId) {
                                success(beers[i]);
                            }
                        }

                        reject('Beer not found');
                    });
                });
            }
        };
    });

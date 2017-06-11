angular.module('app.filters', [])
    .filter('newline', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text.replace(/(?:\r\n|\r|\n)/g, '<br>'));
        };
    })
;
'use strict';

angular.module('Leaderboard', []).controller("LeaderboardController", ['$scope', '$http', function ($scope, $http) {

    $http.get('/data').success(function (data) {
        $scope.frameworks = data;
    }).error(function (error) {
        console.error('Error = ', error);
    });

    $scope.addFramework = function () {
        var frameworks = angular.copy($scope.frameworks);
        frameworks.push({
            name: $scope.framework,
            upVote: 1,
            downVote: 0
        });
        publish(frameworks);
    };

    initConn(function (response) {
        $scope.frameworks = response.text;
        $scope.$apply();
    });
}]);
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

    function addVote(name, vote) {
        var frameworks = angular.copy($scope.frameworks);
        for (var i = 0; i < frameworks.length; i++) {
            if (frameworks[i].name === name) {
                frameworks[i][vote]++;
                break;
            }
        }
        publish(frameworks);
    }

    $scope.upVote = function (framework) {
        addVote(framework.name, 'upVote');
    };

    $scope.downVote = function (framework) {
        addVote(framework.name, 'downVote');
    };

    initConn(function (response) {
        $scope.frameworks = response.text;
        $scope.$apply();
    });
}]);
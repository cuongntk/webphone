'use strict';

// Articles controller
angular.module('friends').controller('FriendsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Friends',
  function ($scope, $stateParams, $location, Authentication, Friends) {
    $scope.authentication = Authentication;

    // Create new Article
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'friendForm');

        return false;
      }

      // Create new Article object
      var friend = new Friends({
        friendName: this.friendName,
        friendPhone: this.friendPhone
      });

      // Redirect after save
      friend.$save(function (response) {
        $location.path('friends/' + response._id);

        // Clear form fields
        $scope.friendName = '';
        $scope.friendPhone = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Article
    $scope.remove = function (article) {
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };

    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      var article = $scope.article;

      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.friends = Friends.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.friend = Friends.get({
        articleId: $stateParams.articleId
      });
    };
  }
]);

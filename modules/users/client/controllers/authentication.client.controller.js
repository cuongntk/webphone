'use strict';

angular.module('users').controller('AuthenticationController', ['$filter', '$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($filter, $scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    var $translate = $filter('translate');
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $scope.credentials.username = $scope.credentials.email;
      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        // Translate some special errors
        if (response.message.indexOf('email already exists') !== -1) {
          $scope.error = $translate('SIGNUP_EMAIL_EXIST');
        } else if (response.message.indexOf('Please fill a valid email address') !== -1) { 
          $scope.error = $translate('SIGNUP_EMAIL_INVALID');
        } else {
          $scope.error = response.message;
        }
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $scope.credentials.username = $scope.credentials.email;
      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        if (response.status === 1) { // active
          // If successful we assign the response to the global user model
          $scope.authentication.user = response;
          // And redirect to the previous or home page
          $state.go($state.previous.state.name || 'home', $state.previous.params);
        } else {
          $scope.error = $translate('SIGNIN_ERR_0');
        }
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);

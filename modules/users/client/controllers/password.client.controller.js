'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$filter', '$stateParams', '$http', '$location', 'Authentication', 'PasswordValidator',
  function ($scope, $filter, $stateParams, $http, $location, Authentication, PasswordValidator) {
    var $translate = $filter('translate');
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    //If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    // Submit forgotten password account id
    $scope.askForPasswordReset = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'forgotPasswordForm');

        return false;
      }

      $scope.credentials.username = $scope.credentials.email;
      $http.post('/api/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;

      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        // Translate some special errors
        if (response.message.indexOf('No account with that username has been found') !== -1) {
          $scope.error = $translate('FORGOT_PASSWORD_EMAIL_NOT_FOUND');
        } else if (response.message.indexOf('Failure sending email') !== -1) {
          $scope.error = $translate('FORGOT_PASSWORD_EMAIL_SEND_FAIL');
        } else if (response.message.indexOf('An email has been sent to the provided email with further instructions.') !== -1) {
          $scope.error = $translate('FORGOT_PASSWORD_EMAIL_SEND_SUCCESS');
        } else {
          $scope.error = response.message;
        }
      });
    };

    // Change user password
    $scope.resetUserPassword = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'resetPasswordForm');

        return false;
      }

      $http.post('/api/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;

        // Attach user profile
        Authentication.user = response;

        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

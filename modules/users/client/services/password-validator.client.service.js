'use strict';

// PasswordValidator service used for testing the password strength
angular.module('users').factory('PasswordValidator', ['$window', '$filter',
  function ($window, $filter) {
    var $translate = $filter('translate');
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

    return {
      getResult: function (password) {
        var result = owaspPasswordStrengthTest.test(password);
        return result;
      },
      getPopoverMsg: function () {
        return $translate('SIGNUP_PASSWORD_POPOVERMSG');
      }
    };
  }
]);

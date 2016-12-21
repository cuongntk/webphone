'use strict';

// PasswordValidator service used for testing the password strength
angular.module('users').factory('PasswordValidator', ['$window', '$translate',
  function ($window, $translate) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

    return {
      getResult: function (password) {
        var result = owaspPasswordStrengthTest.test(password);
        return result;
      },
      getPopoverMsg: function () {
        var popoverMsg = {
          en: 'Please enter a passphrase or password with greater than 10 characters, numbers, lowercase, upppercase, and special characters.',
          vn: 'Mời nhập mật khẩu dài hơn 10 kí tự bao gồm số, kí tự thường, hoa và đặc biệt)'
        };
        return popoverMsg[$translate.use()];
      }
    };
  }
]);

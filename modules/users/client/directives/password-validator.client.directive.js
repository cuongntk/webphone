'use strict';

angular.module('users')
  .directive('passwordValidator', ['PasswordValidator', '$translate', function(PasswordValidator, $translate) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$validators.requirements = function (password) {
          var status = true;
          if (password) {
            var result = PasswordValidator.getResult(password);
            var requirementsIdx = 0;

            // Requirements Meter - visual indicator for users
            var requirementsMeter = [
              { color: 'danger', progress: '20' },
              { color: 'warning', progress: '40' },
              { color: 'info', progress: '60' },
              { color: 'primary', progress: '80' },
              { color: 'success', progress: '100' }
            ];

            if (result.errors.length < requirementsMeter.length) {
              requirementsIdx = requirementsMeter.length - result.errors.length - 1;
            }

            scope.requirementsColor = requirementsMeter[requirementsIdx].color;
            scope.requirementsProgress = requirementsMeter[requirementsIdx].progress;

            if (result.errors.length) {
              // Translate errors
              if ($translate.use() === 'vn') {
                for (var i = 0; i < result.errors.length; i++) { 
                  switch (result.errors[i]) {
                    case 'The password must be at least 10 characters long.':
                      result.errors[i] = 'Mật khẩu phải dài ít nhất 10 kí tự.';
                      break;
                    case 'The password must contain at least one lowercase letter.':
                      result.errors[i] = 'Mật khẩu phải chứa ít nhất 1 kí tự thường.';
                      break;
                    case 'The password must contain at least one uppercase letter.':
                      result.errors[i] = 'Mật khẩu phải chứa ít nhất 1 kí tự viết hoa.';
                      break;
                    case 'The password must contain at least one special character.':
                      result.errors[i] = 'Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt.';
                      break;
                    case 'The password may not contain sequences of three or more repeated characters.':
                      result.errors[i] = 'Mật khẩu chỉ có thể chứa tối đa 2 kí tự liên tiếp giống nhau.';
                      break;
                    case 'The password must contain at least one number.':
                      result.errors[i] = 'Mật khẩu phải chứa ít nhất 1 số.';
                      break;
                    case 'The password must be at least 10 characters long.':
                      result.errors[i] = 'Mật khẩu phải dài ít nhất 10 kí tự.';
                      break;
                  }
                }
              }
              scope.popoverMsg = PasswordValidator.getPopoverMsg();
              scope.passwordErrors = result.errors;
              status = false;
            } else {
              scope.popoverMsg = '';
              scope.passwordErrors = [];
              status = true;
            }
          }
          return status;
        };
      }
    };
  }]);

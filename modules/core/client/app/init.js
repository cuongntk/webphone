'use strict';

var translationsEN = {
  MENU_SIGNUP: 'Sign up',
  MENU_SIGNIN: 'Sign in',
  SIGNUP_HEADER: 'The phone number will be sent to your Email',
  SIGNUP_DISPLAYNAME: 'Display name',
  SIGNUP_DISPLAYNAME_REQUIRED: 'Display name is required.',
  SIGNUP_EMAIL: 'Email',
  SIGNUP_EMAIL_REQUIRED: 'Email address is required.',
  SIGNUP_EMAIL_INVALID: 'Email address is invalid.',
  SIGNUP_PASSWORD: 'Password',
  SIGNUP_PASSWORD_REQUIRED: 'Password is required.',
  SIGNUP_PASSWORD_REQUIREMENTS: 'Password Requirements',
  SIGNUP_OR: 'or',
  SIGNIN_EMAIL: 'Email',
  SIGNIN_EMAIL_REQUIRED: 'Email address is required.',
  SIGNIN_EMAIL_INVALID: 'Email address is invalid.',
  SIGNIN_PASSWORD: 'Password',
  SIGNIN_PASSWORD_REQUIRED: 'Password is required.',
  SIGNIN_FORGOT_PASSWORD: 'Forgot your password?',
  FORGOT_PASSWORD_HEADER: 'Restore your password',
  FORGOT_PASSWORD_LABEL: 'Enter your account email.',
  RESET_PASSWORD_HEADER: 'Reset your password',
  RESET_PASSWORD_NEW: 'New Password',
  RESET_PASSWORD_VERIFY: 'Verify Password',
};
 
var translationsVN= {
  MENU_SIGNUP: 'Đăng kí',
  MENU_SIGNIN: 'Đăng nhập',
  SIGNUP_HEADER: 'Số điện thoại sẽ được gửi vào Email của bạn',
  SIGNUP_DISPLAYNAME: 'Tên hiển thị',
  SIGNUP_DISPLAYNAME_REQUIRED: 'Bạn chưa nhập tên hiển thị.',
  SIGNUP_EMAIL: 'Email',
  SIGNUP_EMAIL_REQUIRED: 'Bạn chưa nhập Email.',
  SIGNUP_EMAIL_INVALID: 'Địa chỉ Email không hợp lệ.',
  SIGNUP_PASSWORD: 'Mật khẩu',
  SIGNUP_PASSWORD_REQUIRED: 'Bạn chưa nhập Mật khẩu.',
  SIGNUP_PASSWORD_REQUIREMENTS: 'Độ mạnh Mật khẩu',
  SIGNUP_OR: 'hoặc',
  SIGNIN_EMAIL: 'Email',
  SIGNIN_EMAIL_REQUIRED: 'Bạn chưa nhập Email.',
  SIGNIN_EMAIL_INVALID: 'Địa chỉ Email không hợp lệ.',
  SIGNIN_PASSWORD: 'Mật khẩu',
  SIGNIN_PASSWORD_REQUIRED: 'Bạn chưa nhập Mật khẩu.',
  SIGNIN_FORGOT_PASSWORD: 'Bạn quên Mật khẩu?',
  FORGOT_PASSWORD_HEADER: 'Khôi phục Mật khẩu',
  FORGOT_PASSWORD_LABEL: 'Nhập địa chỉ email của bạn.',
  RESET_PASSWORD_HEADER: 'Nhập mật khẩu mới của bạn',
  RESET_PASSWORD_NEW: 'Mật khẩu mới',
  RESET_PASSWORD_VERIFY: 'Nhập lại',
};

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$httpProvider',
  function ($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');
  }
]);

angular.module(ApplicationConfiguration.applicationModuleName).config(['$translateProvider',
  function ($translateProvider) {
    // add translation tables
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('vn', translationsVN);
    $translateProvider.preferredLanguage('vn');
    $translateProvider.fallbackLanguage('vn');
  }
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(function ($rootScope, $state, Authentication) {

  // Check authentication before changing state
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
      var allowed = false;
      toState.data.roles.forEach(function (role) {
        if (Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1) {
          allowed = true;
          return true;
        }
      });

      if (!allowed) {
        event.preventDefault();
        if (Authentication.user !== undefined && typeof Authentication.user === 'object') {
          $state.go('forbidden');
        } else {
          $state.go('authentication.signin').then(function () {
            storePreviousState(toState, toParams);
          });
        }
      }
    }
  });

  // Record previous state
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    storePreviousState(fromState, fromParams);
  });

  // Store previous state
  function storePreviousState(state, params) {
    // only store this state if it shouldn't be ignored 
    if (!state.data || !state.data.ignoreState) {
      $state.previous = {
        state: state,
        params: params,
        href: $state.href(state, params)
      };
    }
  }
});

//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash && window.location.hash === '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState('', document.title, window.location.pathname);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      var scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
      };
      window.location.hash = '';
      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

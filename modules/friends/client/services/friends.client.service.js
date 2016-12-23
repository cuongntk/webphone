'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('friends').factory('Friends', ['$resource',
  function ($resource) {
    return $resource('api/friends/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

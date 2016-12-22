'use strict';

// Setting up route
angular.module('friends').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('friends', {
        abstract: true,
        url: '/friends',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('friends.list', {
        url: '',
        templateUrl: 'modules/articles/client/views/list-articles.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('friends.create', {
        url: '/create',
        templateUrl: 'modules/articles/client/views/create-article.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('friends.view', {
        url: '/:articleId',
        templateUrl: 'modules/articles/client/views/view-article.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('friends.edit', {
        url: '/:articleId/edit',
        templateUrl: 'modules/articles/client/views/edit-article.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
